import {getAllProduct} from '../api/product.js'
import {getCartByUserId,udpateCart,addCart} from '../api/cart.js'
const app ={
    renderListProduct:async function(){
        // 1. lấy danh sách sản phẩm từ db
        const data = await getAllProduct();
        console.log(data);
        const productItem = data?.map((item)=>{
            return `
                <div class="col-3 mb-3">
                    <div class="card" style="width: 18rem;">
                        <img style="height: 300px;object-fit:cover" src="${item.image}" class="card-img-top" alt="${item.title}">
                        <div class="card-body">
                        <h5 class="card-title">${item.title.substring(0,10)}...</h5>
                        <p class="card-text">${item.description.substring(0,30)}...</p>
                        <a 
                            data-id="${item.id}"
                            data-producttitle="${item.title}"
                            data-productprice="${item.price}"
                            data-producttitle="${item.title}"
                            data-productiamge="${item.image}"
                            href="#" class="btn btn-primary btn-addCart">Add cart</a>
                        </div>
                    </div>
                </div>
            `
        }).join("")

        const listProduct = document.getElementById('list-product');
        listProduct.innerHTML = productItem;
        // logic add cart
        this.handleAddCart();
        
    },
    handleAddCart: function(){
        // 1. lấy các nút thêm giỏ hàng
        const btnAddCarts = document.querySelectorAll('.btn-addCart');
        // 2. khai báo sự kiện click
        btnAddCarts.forEach((item)=>{
            item.addEventListener("click",async()=>{
                // console.log("add cart");
                // 3. lấy dữ liệu từ nút add cart
                // console.log(item);
                const dataAddCart = {
                    productId : item.dataset.id,
                    productTitle : item.dataset.producttitle,
                    productPrice : item.dataset.productprice,
                    productImage : item.dataset.productiamge,
                    userId: "USER_01",
                    productQuatity: 1
                }

                console.log(dataAddCart);
                // 4. Kiểm tra
                // 4.1 Lấy toàn bộ sản phẩm trong giỏ hàng của ông "USER_01"
                const cartProducts = await getCartByUserId("USER_01") ;
                // console.log(cartProducts);
                //4.2 Kiểm tra xem đã tồn tại phần tử đó trong giỏ hàng
                // Nếu chưa có thì thêm mới vào giỏ hàng
                // Nếu có thì cộng dồn số lượng

                const findProductInCart = cartProducts.find((item)=>{
                    return item.productId == dataAddCart.productId
                })

                console.log(findProductInCart);

                if(findProductInCart){
                    // đã tồn tại
                    const updateCart ={
                        ...findProductInCart,//spread
                        productQuatity: findProductInCart.productQuatity + 1 // cộng số lượng sản phẩm trước với 1
                    }

                    // console.log(updateCart);

                    // 4.3// cập nhật vào db
                    udpateCart(updateCart);
                    
                }else{
                    // chưa tồn tại -> thêm mời vào db
                    addCart(dataAddCart)
                }
                
                
            })
        })
    },
    handleCountCart:async function(){
        const counCart = document.getElementById('count-number-cart');
        //2. lấy số lượng sản phẩm trong giỏ hàng của ông user đang đăng nhập
        const data = await getCartByUserId("USER_01");
        // console.log(data);
        counCart.innerHTML = data.length || 0;
        
    },

    start: function(){
        this.renderListProduct();
        this.handleCountCart();
    }
}

app.start();