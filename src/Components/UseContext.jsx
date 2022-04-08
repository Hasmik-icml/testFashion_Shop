// import { useState, useEffect, useContext, createContext } from "react"

// const dataContext = createContext(null);

// export function Parent(){

// const [data, setData] = useState();


//     useEffect(()=>{
//         fetch("https://restcountries.com/v3.1/all")
//         .then(data=>{
//             return data.json();
//         })
//         .then(response=>{
//             setData(response);
           
//         })
//     },[])

//     // console.log(data[0].name);
    
//     return(
//         <dataContext.Provider value={data}>
//             <Child />
//         <div>
//             <h4>Parent component</h4>
//         </div>
//         </dataContext.Provider>
//     )
// }


// function Child(){
//     return(
        
//         <div>
//         <SubChild />
//             <h4>Child component</h4>
//         </div>
//     )
// }

// function SubChild(){

//     const getContext = useContext(dataContext);
//     const  [newContext, setNewContext] = useState(getContext)

//     console.log(newContext[0][1]);

//     return(
//         <div>
//             {/* <h1>{getContext.borders[0]}</h1>
//             <h4>{getContext.capital[0]}</h4> */}
//             <h4>SubChild component</h4>
//         </div>
//     )
// }
import { useState, useEffect, useContext, createContext } from "react";

const dataContext = createContext(null);

export function Parent() {
  const [data, setData] = useState();
  useEffect(() => {
    //fetch("https://restcountries.com/v3.1/all")
    fetch("https://baby-island.herokuapp.com/homeproduct")
      .then((data) => {
        console.log("data....");
        return data.json();
      })
      .then((response) => {
        console.log("response=", response);
        setData(response);
      });
  }, []);

  return (
    <dataContext.Provider value={data}>
      <Child key="child" />
      <div>
        <h4>Parent component</h4>
      </div>
    </dataContext.Provider>
  );
}

function Child() {
  return (
    <div>
      <SubChild key="subchild" />
      <h4>Child component</h4>
    </div>
  );
}

function SubChild() {
  const newContext = useContext(dataContext);

  console.log("getContext.lenghth===", newContext ? newContext.length : 0);
  
  const [allData, setAllData] = useState([{ name: "test" }]);

  useEffect(() => {
    setAllData(newContext ? newContext : "loading 2...");
  }, [newContext]);

  return (
    <div>
      <div> allData: {allData[0].name}</div>
      <h2>
        Data :
        {newContext && newContext.length > 0 ? (
          newContext.map((data, index) => {
            return <div key={`${data.id}${index}`}>{data.name}</div>;
          })
        ) : (
          <div key="loading">{"loading..."}</div>
        )}
      </h2>
      <h4>SubChild component</h4>
    </div>
  );
}