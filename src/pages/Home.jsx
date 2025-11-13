import React from "react";
import Banner from "../components/Banner";

const Home = () => {
  return (
    <div className="pt-16">
      {/* pt-16 accounts for the fixed navbar height */}
      <Banner></Banner>
      <main className="grid grid-cols-12">
        <div className="col-span-8">
          <h1>This is right side.</h1>
        </div>
        <div className="col-span-4">
          <h1>This is left side</h1>
        </div>
      </main>
    </div>
  );
};

export default Home;
