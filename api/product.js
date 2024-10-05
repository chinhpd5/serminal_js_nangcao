
//module
export const getAllProduct =async ()=>{
    try {
        const res = await fetch(`http://localhost:3000/products`);
        // console.log(res);
        const data = await res.json();
        // console.log(data);
        return data;
    } catch (error) {
        alert("Lỗi danh sách")
    }

}