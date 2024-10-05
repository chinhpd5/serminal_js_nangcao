
//module
export const getAllProduct =async ()=>{
    try {
        const res = await fetch(`http://localhost:3000/products`); // mặc định có phương thức get
        // console.log(res);
        const data = await res.json();
        // console.log(data);
        return data;
    } catch (error) {
        alert("Lỗi danh sách")
    }

}

export const deleteProduct = async(id)=>{
    try {
        await fetch(`http://localhost:3000/products/${id}`,{
            method: "delete"
        })
        alert("Xóa thành công");
    } catch (error) {
        alert("Xóa thất bại")
    }
}

export const addProduct =async (data) =>{
    try {
        await fetch(`http://localhost:3000/products`,{
            method: "post",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
       
        
    } catch (error) {
        alert("Thêm thất bại")
    }
}

export const getProductById = async(id)=>{
    try {
        const res = await fetch(`http://localhost:3000/products/${id}`)// mặc định method : get
        const data = await res.json();
        return data;
    } catch (error) {
        alert("Lỗi")
    }
}

export const updateProduct = async(id, data)=>{
    try {
        await fetch(`http://localhost:3000/products/${id}`,{
            method: "put",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
       
        
    } catch (error) {
        alert("Cập nhật thất bại")
    }
}