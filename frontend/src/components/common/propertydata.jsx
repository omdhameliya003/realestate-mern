

export async function getProperties(setProperties){
    try {
        const token=JSON.parse(localStorage.getItem("token")||"");
        const res= await fetch("https://wonder-property-backend.onrender.com/property",{
            method:"GET",
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${token}`
            }
        }
        );
        const data= await res.json() ;
        const propertydata=data.properties;
        setProperties(propertydata)
    } catch (error) {
        console.log("Error:-",error)   
    }
}  
