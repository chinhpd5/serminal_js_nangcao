import {getAllProduct,deleteProduct} from '../api/product.js'

const app ={
    //key: value
    // hiển thị giao diện cho danh sách sản phẩm
    renderListProduct: async function(){
        // 1. Call api lấy dữ liệu từ db.json
       const data = await getAllProduct()

        // 2. Hiển thị danh sách sản phẩm
        // 2.1: Duyệt qua mảng data
        const trList = data?.map((product,index)=>{
            return `
                <tr>
                    <th scope="row">${index+1}</th>
                    <td>${product.title}</td>
                    <td>${product.price}</td>
                    <td><img style="height:100px" src="${product.image}" alt=""></td>
                    <td>${product.category}</td>
                    <td>${product.description.substring(0,100)}...</td>
                    <td>
                        <a href="editProduct.html?id=${product.id}" class="btn btn-warning">Sửa</a>
                        <button data-id="${product.id}" class="btn btn-danger btn-delete">Xóa</button>
                    </td>
                </tr>
            `
        }).join("")// join : chuyển mảng về chuỗi
        // console.log(trList);

        // 2.2 lấy phần tử tbody có id: #product-list
        const tbodyElement = document.getElementById('product-list');
        // 2.3 gán trList vào tbody thông thuộc tính innerHTML

        tbodyElement.innerHTML = trList;

        //========================
        // Xử lý logic xóa
        this.handleDelete();
    },

    handleDelete: function(){
        // 1. lấy toàn bộ nút xóa: querySelectorAll
        const btnDeletes =document.querySelectorAll('.btn-delete');
        // console.log(btnDeletes);
        // 2. Duyệt mảng và khai báo sự kiện
        btnDeletes.forEach((item)=>{
            // console.log(item);
            item.addEventListener("click",()=>{
                // console.log("click!!");
                //2.1: xác nhận
                if(window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này không?")){
                    // 2.2 lấy id của sản phẩm
                    // cách 1: dataset
                    // const id = item.dataset.id;  
                    // cách 2: getAttribute   
                    const id = item.getAttribute("data-id");
                    // console.log(id);
                    //3. Xóa sản phẩm
                    deleteProduct(id);
                }
                
            })
            
        })
        
    },

    start: function(){
        // console.log("chinhpd5");
        // render: Hiển thị giao diện
        // handle: Xử lý logic 
        this.renderListProduct();
    }
}

app.start();