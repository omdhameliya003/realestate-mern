

export async function getProperties(setProperties){
    try {
        const token=JSON.parse(localStorage.getItem("token")||"");
        const res= await fetch("http://localhost:5000/property",{
            method:"GET",
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${token}`
            }
        }
        );
        const data= await res.json() ;
        console.log("hello for testing.")
        const propertydata=data.properties;
        setProperties(propertydata)
        console.log("property data:-",propertydata);
    } catch (error) {
        console.log("Error:-",error)   
    }
}  
