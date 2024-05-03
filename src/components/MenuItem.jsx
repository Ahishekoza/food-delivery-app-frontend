/* eslint-disable react/prop-types */
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const MenuItem = ({ menuItem }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{menuItem?.name}</CardTitle>
      </CardHeader>
      <CardContent className="font-bold">
        £{menuItem?.price}
      </CardContent>
    </Card>
  );
};

export default MenuItem;
