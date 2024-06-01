import axios from 'axios'
const getData = async ()=>{
    try {
        const {data} = await axios.get('http://localhost:8000/registration')
        console.log(data)
    } catch (error) {
        console.log(error)
    }

}
getData();

const createData = async (fullName, nim, email, phoneNumber, address)=>{
    try {
        const {data} = await axios.post('http://localhost:8000/registration',{
            fullName,
            nim,
            email,
            phoneNumber,
            address
        })
        console.log(data)
    } catch (error) {
        console.log(error)
    }
}

createData('Vargas', '41037006231022', 'var@gmail.com', '083190456165', 'Bandung');