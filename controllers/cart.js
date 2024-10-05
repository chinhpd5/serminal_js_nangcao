import {getCartByUserId} from '../api/cart.js';
const app ={
    renderListCart: async function(){
        // call api lấy danh sách giỏ hàng của ông user 01
        const data = await getCartByUserId("USER_01");
        // console.log(data);
        let total = 0;
        let trList = data?.map((item,index)=>{
            total += item.productQuatity* item.productPrice; // số lượng * đơn giá
            return `
                <tr>
                    <th scope="row">${index+1}</th>
                    <td>${item.productTitle}</td>
                    <td><img style="height: 70px" src="${item.productImage}" alt=""></td>
                    <td>${item.productPrice}</td>
                    <td>
                        <button class="btn btn-outline-secondary">-</button>
                        ${item.productQuatity}
                        <button class="btn btn-outline-secondary">+</button>

                    </td>
                    <td>
                        <button class="btn btn-danger">Xóa</button>
                    </td>
                </tr>
            `
        }).join("");
        // tổng tiền
        trList +=`
                <tr>
                    <td colSpan="3">Tổng tiền</td>
                    <td colSpan="3">
                        ${total.toFixed(2)}
                    </td>
                </tr>
            `

        document.querySelector("tbody").innerHTML = trList;
        
    },

    start: function(){
        this.renderListCart();
    }   
}

app.start();
