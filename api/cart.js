export const getCartByUserId = async(useeId)=>{
    try {
        const res = await fetch(`http://localhost:3000/carts?userId=${useeId}`)
        // trả về danh sách các phần tử có userId theo tìm kiếm

        const data = await res.json();
        return data
    } catch (error) {
        alert("Lỗi")
    }
}

export const udpateCart = async (data)=>{
    try {
        await fetch(`http://localhost:3000/carts/${data.id}`,{
            method:"put",
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
    } catch (error) {
        
    }
}


export const addCart = async (data)=>{
    try {
        await fetch(`http://localhost:3000/carts`,{
            method:"post",
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
    } catch (error) {
        alert("lỗi")
    }
}