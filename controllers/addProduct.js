import {addProduct} from '../api/product.js'
const app={

    handleAddProduct: function(){
        // 1. Bắt sự kiện submit của form
        const form = document.querySelector('#form');
        // 2. định nghĩa sự kiện submit form
        form.addEventListener("submit",async (event)=>{
            // ngăn chặn hành vi load trang của form
            event.preventDefault();
            // 3. Lấy giá trị của các input
            const inputTitle = document.getElementById('title')
            const inputPrice = document.getElementById('price')
            const inputDescription = document.getElementById('description')
            const inputImage = document.getElementById('image')
            const inputCategory = document.getElementById('category')
            // 4. Validate
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

            // 5. Lấy giá trị
            const data = {
                title : inputTitle.value,
                price: inputPrice.value,
                description: inputDescription.value,
                category: inputCategory.value,
                image: inputImage.value
            }

            // console.log(data);
            // 6. Thêm vào db
            await addProduct(data);
            window.location = 'listProduct.html'
            alert("Thêm thành công");
            
        })
    },

    start: function(){
        this.handleAddProduct()
    }
}

app.start();