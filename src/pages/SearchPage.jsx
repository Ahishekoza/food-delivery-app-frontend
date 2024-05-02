import { useSearchRestaurants } from "@/api/RestaurantSearchApi";
import SearchBar from "@/components/SearchBar";
import SearchResultCard from "@/components/SearchResultCard";
import SearchResultInfo from "@/components/SearchResultInfo";
import { useParams } from "react-router-dom";

const SearchPage = () => {
  const { city } = useParams();

  const { searchResults ,isLoading } = useSearchRestaurants(city);
  
  if(isLoading){
    return <span>Loading ....</span>
  }
  if(searchResults.length===0 || !city){
    return <span>Result Not Found ..</span>
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
      <div id="cuisines-list">
        Insert Cuisine List here
      </div>
      <div id="main-content" className="flex flex-col gap-5">
      <SearchBar
          
          placeHolder="Search by Cuisine or Restaurant Name"
         
        />
        <SearchResultInfo total={searchResults?.pagination?.total} city={city}/>
        {searchResults?.data.map((restaurant) => {
          return (
            <>
              <SearchResultCard key={restaurant?._id} restaurant={restaurant} />
            </>
          );
        })}
      </div>
    </div>
  );
};

export default SearchPage;
