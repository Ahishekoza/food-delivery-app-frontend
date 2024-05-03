/* eslint-disable no-unused-vars */
import { useSearchRestaurants } from "@/api/RestaurantSearchApi";
import CuisineFilter from "@/components/CuisineFilter";
import PaginationSelector from "@/components/PaginationSelector";
import SearchBar from "@/components/SearchBar";
import SearchResultCard from "@/components/SearchResultCard";
import SearchResultInfo from "@/components/SearchResultInfo";
import { useState } from "react";
import { useParams } from "react-router-dom";

const SearchPage = () => {
  const { city } = useParams();

  const [searchState, setSearchState] = useState({
    searchQuery: "",
    page: 1,
    selectedCuisines: [],
  });
  const [isExpanded, setIsExpanded] = useState(false);
  const { searchResults, isLoading } = useSearchRestaurants(city, searchState);

  if (isLoading) {
    return <span>Loading ....</span>;
  }
  if (searchResults.length === 0 || !city) {
    return <span>Result Not Found ..</span>;
  }


  const setSelectedCuisines =(selectedCuisines)=>{
    console.log(selectedCuisines);
    setSearchState((prevState)=>(
      {
        ...prevState,
        selectedCuisines:selectedCuisines,
        page:1
        
      }
    ))
  }

  const setPage = (page) => {
    setSearchState((prevState) => ({
      ...prevState,
      page,
    }));
  };

  const setSearchQuery = (data) => {
    setSearchState((prevState) => ({
      ...prevState,
      searchQuery: data?.searchQuery,
      page: 1,
    }));
  };

  const resetSearch = () => {
    setSearchState((prevState) => ({
      ...prevState,
      searchQuery: "",
      page: 1,
    }));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
      <div id="cuisines-list">
        <CuisineFilter
          selectedCuisines={searchState.selectedCuisines}
          isExpanded={isExpanded}
          onChange={setSelectedCuisines}
          onExpandedClick={()=>setIsExpanded((prevState)=> !prevState)}
          />
      </div>

      <div id="main-content" className="flex flex-col gap-5">
        <SearchBar
          searchQuery={searchState.searchQuery}
          onSubmit={setSearchQuery}
          onReset={resetSearch}
          placeHolder="Search by Cuisine or Restaurant Name"
        />
        <SearchResultInfo
          total={searchResults?.pagination?.total}
          city={city}
        />
        {searchResults?.data.map((restaurant) => {
          return (
            <>
              <SearchResultCard key={restaurant?._id} city={city} restaurant={restaurant} />
            </>
          );
        })}
        <PaginationSelector
          page={searchResults?.pagination?.page}
          pages={searchResults?.pagination?.pages}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
};

export default SearchPage;
