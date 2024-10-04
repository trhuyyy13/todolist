import express from 'express';
import { engine } from 'express-handlebars';
import { fileURLToPath } from 'url';
import path from 'path';
import morgan from 'morgan';
import bodyParser from 'body-parser';  // Để xử lý dữ liệu từ form

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Cấu hình middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('combined'));
app.use(bodyParser.urlencoded({ extended: false }));  // Xử lý dữ liệu POST từ form

// Cấu hình Handlebars
app.engine('handlebars', engine({
    partialsDir: path.join(__dirname, '/resources/views/partials'),  
    layoutsDir: path.join(__dirname, '/resources/views/layouts'),    
    defaultLayout: 'main',  
}));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, '/resources/views'));

// Route chính (GET) - hiển thị form
app.get('/', (req, res) => {
    res.render('me', { title: 'Trang chủ' });
});

// Route POST xử lý form trên trang /me
app.post('/home', (req, res) => {
    const name = req.body.name;  // Lấy giá trị từ input "name" trong form

    // Kiểm tra nếu người dùng nhập tên
    if (!name || name.trim() === "") {
        return res.send('Vui lòng nhập tên hợp lệ!');  // Gửi thông báo nếu tên rỗng
    }

    // Chuyển hướng đến trang /home với tên người dùng trong query string
    res.redirect(`/home?name=${encodeURIComponent(name)}`);
});

// Route trang home (GET)
app.get('/home', (req, res) => {
    const name = req.query.name;  // Lấy tên từ query string
    res.render('home', { title: 'Trang Home', name: name });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
