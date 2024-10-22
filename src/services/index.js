
import axios from 'axios'



function api() {
    const fetchData = async(url) =>
        {
          return await axios.get(url).then(res => res.data.data.map((e)=>[e.name,e.coordinates]));
        }
      
        const data = fetchData('https://turkiyeapi.dev/api/v1/provinces');



  return 
  
}
  

export default api
