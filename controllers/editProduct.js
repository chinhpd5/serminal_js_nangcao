import {getProductById,updateProduct} from '../api/product.js'
// global
const inputTitle = document.getElementById('title')
const inputPrice = document.getElementById('price')
const inputDescription = document.getElementById('description')
const inputImage = document.getElementById('image')
const inputCategory = document.getElementById('category')
var id;

const app ={
    handleEdit:async function(){
        // 1. Lấy id trên URL
        const sreachParam = new URLSearchParams(window.location.search);
        if(sreachParam.has("id")){ // kiểm tra xem có phần tử id trong search param
            id = sreachParam.get("id"); // lấy giá trị của id
            // console.log(id);
            // 2. lấy thông tin sản phẩm theo id
            const product = await getProductById(id);
            console.log(product);
            
            // 3. đổ dữ liệu(product) vào form
            

            inputTitle.value = product.title;
            inputPrice.value = product.price;
            inputCategory.value = product.category;
            inputDescription.value = product.description;
            inputImage.value = product.image;
            //4. cập nhật giá trị vào db sau khi người dùng chỉnh sửa
            this.handUpdate();
            
        }
    },
    handUpdate: async function(){
        // 0. bắt sự kiện submit
        const btnSubmit = document.getElementById('form');
        btnSubmit.addEventListener('submit',async (e)=>{
            e.preventDefault();
            //1. lấy dữ liệu từ input
            // ở phạm vi global

            //2. validate

            if(!inputTitle.value){
                alert("cần nhập dữ liệu title");
                inputTitle.focus(); // focus vào ô input
                return; // dừng lại các tác vụ tiếp theo
            }

            if(!inputPrice.value){
                alert("cần nhập dữ liệu price");
                inputPrice.focus(); // focus vào ô input
                return; // dừng lại các tác vụ tiếp theo
            }

            if(!inputDescription.value){
                alert("cần nhập dữ liệu description");
                inputDescription.focus(); // focus vào ô input
                return; // dừng lại các tác vụ tiếp theo
            }

            if(!inputImage.value){
                alert("cần nhập dữ liệu hình ảnh");
                inputImage.focus(); // focus vào ô input
                return; // dừng lại các tác vụ tiếp theo
            }

            // 3. lấy data
            const data = {
                title : inputTitle.value,
                price: inputPrice.value,
                description: inputDescription.value,
                category: inputCategory.value,
                image: inputImage.value
            }

            // 4. cập nhật vào db

            await updateProduct(id,data);
            window.location = 'listProduct.html';
            alert("Cập nhật thành công");

        })
    },
    start: function(){
        this.handleEdit()
    }
}

app.start();