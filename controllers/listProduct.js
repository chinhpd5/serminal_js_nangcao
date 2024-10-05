import {getAllProduct} from '../api/product.js'

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
                        <a href="editProduct.html" class="btn btn-warning">Sửa</a>
                        <button class="btn btn-danger btn-delete">Xóa</button>
                    </td>
                </tr>
            `
        }).join("")// join : chuyển mảng về chuỗi
        // console.log(trList);

        // 2.2 lấy phần tử tbody có id: #product-list
        const tbodyElement = document.getElementById('product-list');
        // 2.3 gán trList vào tbody thông thuộc tính innerHTML

        tbodyElement.innerHTML = trList;
        
    },

    start: function(){
        // console.log("chinhpd5");
        // render: Hiển thị giao diện
        // handle: Xử lý logic 
        this.renderListProduct();
    }
}

app.start();