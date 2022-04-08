import "./dashboard.css";
// import "./BuyProduct.css";
import { domainName } from "../../config";
import { getOrders, authoriseUser, getAllOrders, getOrderByStatus, getProducts, changeOrderStatus} from "../../Services/api";
import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect} from "react";
import { Icon, Table, TableBody, TableCell, TableRow, Button } from "semantic-ui-react";
import {USER, ADMIN, PAID, UNPAID, PENDING, SENT, ONE} from "../../Services/constants"
import AddProduct from "../products/AddProduct";
import { Link } from "react-router-dom";
import Tabs from "../Tabs/Tabs";
import DataTable from "../dataTable/DataTable";


function Dashboard() {
  const { error, isAuthenticated, isLoading, user, getAccessTokenSilently } =
    useAuth0();
  const [orderList, setOrderList] = useState([]);
 
  const [adminData, setAdminData] = useState({});

  async function orderShow() {
 
    try {
      const token = await getAccessTokenSilently();
      let data = null;

      if (user && user[`${domainName}roles`].includes(ADMIN)){

      const dataResult = await Promise.all([ getProducts(), getOrderByStatus(user.sub, token, UNPAID)] )

      // if (data && Array.isArray(data)) {
      //   if (data.length !== 0) setOrderList(data);
      // } else if (data && data.status === 401) {
      //   const authorised = await authoriseUser(user, token);
      // } else {
      //   console.log("hajox");
      // }

      setAdminData((adminData) => ({
        ...adminData,
        allProducts: dataResult[0],
        pendingProducts: dataResult[1],
      }));
      
      }else {
        data = await getOrders(user.sub, token);
        if (data && Array.isArray(data)) {
          if (data.length !== 0) setOrderList(data);
        } else if (data && data.status === 401) {
          const authorised = await authoriseUser(user, token);
        } else {
          console.log("hajox");
        }
      } 
    }catch (error) {
        console.log("hajox chi");
      }
    }
    useEffect(() => {
      if (user) orderShow();
    }, [user]);
    const {pendingProducts, allProducts} = adminData;
 
    async function changeStatus(status, order_id) {
    
    try {
      const token = await getAccessTokenSilently();
      const changeResult = await changeOrderStatus(user.sub, token, order_id, status)
      console.log("changeResult", changeResult);
    }
    catch (error) {
      console.log("sxal es arel");
    }
    }
  return (
    <div className="dashboard ui container">
      {user &&
      user[`${domainName}roles`] &&
      user[`${domainName}roles`].includes(ADMIN) ? (
        <>
        <AddProduct/>
        <Tabs pendingProducts={pendingProducts} allProducts={allProducts} changeStatus ={changeStatus} />
        </>
      ) : (
        
        <DataTable list={orderList}/>
       
      )}
    </div>
  );
}
export default Dashboard;
