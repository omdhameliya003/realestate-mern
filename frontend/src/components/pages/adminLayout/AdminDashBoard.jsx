import React, { useEffect, useState } from "react";
import Sidebar from "../../common/adminComponent/Sidebar";
import "./AdminDashBoard.css";
import PropertyPieChart from "../../common/adminComponent/PropertyPieChart";
import PropertyBarChart from "../../common/adminComponent/PropertyBarChart";
import WeeklyListingsChart from "../../common/adminComponent/WeeklyListingChart";
// import "../../common/adminComponent/AdminTables.css";
import AdminTable from "../../common/adminComponent/AdminTable";

function AdminDashBoard() {
  const [piChartData, setPiChartData] = useState([]);
  const [forSale, setForSale] = useState([]);
  const [forRent, setForRent] = useState([]);
  const [weeklyData, setWeeklyData] = useState({});
  const [LodingPage, setLodingPage] = useState(true);
  const [properties, setproperties] = useState();
  const [alluser,setallUser]= useState();

  const stateData = [
    { id: 1, lable: "Total Users", count: 0 },
    { id: 2, lable: "Total Properties", count: 0 },
    { id: 3, lable: "Total Houses", count: 0 },
    { id: 4, lable: "Total Flats", count: 0 },
    { id: 5, lable: "Total Shops", count: 0 },
    { id: 6, lable: "Total Offices", count: 0 },
  ];

  const [state_box, setstate_box] = useState([...stateData]);

  useEffect(() => {
    async function getAdminDashboardData() {
      try {
        const token = JSON.parse(localStorage.getItem("token"));
        const [
          totaluser,
          totalCount,
          totalProperties,
          saleandrent,
          weeklyData,
        ] = await Promise.all([
          fetch("http://localhost:5000/auth/alluser", {
            method: "GET",
            headers: {
              authorization: `Bearer ${token}`,
            },
          }),
          fetch("http://localhost:5000/totalPropertyCount", {
            method: "GET",
            headers: {
              authorization: `Bearer ${token}`,
            },
          }),

          fetch("http://localhost:5000/property", {
            method: "GET",
            headers: {
              authorization: `Bearer ${token}`,
            },
          }),

          fetch("http://localhost:5000/offer-summary", {
            method: "GET",
            headers: {
              authorization: `Bearer ${token}`,
            },
          }),
          fetch("http://localhost:5000/weeklyListing-summary", {
            method: "GET",
            headers: {
              authorization: `Bearer ${token}`,
            },
          }),
        ]);
        const Totaluser = await totaluser.json();
        const TotalCount = await totalCount.json();
        const TotalProperties = await totalProperties.json();
        const TotalSaleandRent = await saleandrent.json();
        const TotalWeeklyData = await weeklyData.json();

        const { house, flat, shop, office } = TotalCount.summary;
        setPiChartData([house, flat, shop, office]);
        setForSale(TotalSaleandRent.forSale);
        setForRent(TotalSaleandRent.forRent);
        setWeeklyData(TotalWeeklyData.weeklyData);
        setproperties(TotalProperties.properties);
        setallUser(Totaluser.allUser)

        setstate_box((prev) =>
          prev.map((item) => {
            if (item?.id === 1) {
              return { ...item, count: Totaluser.allUser.length };
            }
            if (item?.id === 2) {
              return { ...item, count: TotalProperties.properties.length };
            }
            if (item?.id === 3) {
              return { ...item, count: house };
            }
            if (item?.id === 4) {
              return { ...item, count: flat };
            }
            if (item?.id === 5) {
              return { ...item, count: shop };
            }
            if (item?.id === 6) {
              return { ...item, count: office };
            }
            return item;
          })
        );
      } catch (error) {
        console.log("error message:-", error);
      } finally {
        setLodingPage(false);
      }
    }
    getAdminDashboardData();
  }, []);

  const propertyTableColumn= [
    {key:"property_name" , lable:"Propety Name"},
    {key:"type" , lable:"Type"},
    {key:"offer" , lable:"Offer"},
    {key:"city" , lable:"City"},
  ];

  const userTableColumn=[
    {key:"user_id" , lable:"User Id"},
    {key:"fname" , lable:"Name"},
    {key:"email" , lable:"Email"},
    {key:"role" , lable:"Role"},
  ];

  if (LodingPage) return <h3 style={{ textAlign: "center" }}> Loding...</h3>;

  return (
    <div className="admin-container">
      <Sidebar />
      <div className="content">
        <div className="stats-container">
          {state_box &&
            state_box.map((item) => {
              return (
                <div className="stat-box" key={item.id}>
                  <span className="count">{item.count}</span>
                  <span className="label">{item.lable}</span>
                </div>
              );
            })}
        </div>
        <hr />
        <div className="chart-container">
          <PropertyPieChart dataCounts={piChartData} />
          <br />
          <hr />
          <PropertyBarChart dataForSale={forSale} dataForRent={forRent} />
        </div>
        <hr />
        <h3>Property Listings Per Week</h3>
        <WeeklyListingsChart data={weeklyData} />
        <br /> <hr />
        <h3>Latest Property Listings</h3>
        <AdminTable column={propertyTableColumn} limit={5} data={properties}/>
    
        <h3>Recent User Registrations</h3>
        <AdminTable  column={userTableColumn} limit={5}  data={alluser}/>
    
      </div>
    </div>
  );
}

export default AdminDashBoard;
