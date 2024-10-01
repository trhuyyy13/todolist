import express from 'express';
import { engine } from 'express-handlebars';
import { fileURLToPath } from 'url';
import path from 'path';
import morgan from 'morgan';  // Nhập morgan để sử dụng HTTP logger

// Tạo __filename và __dirname trong ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Sử dụng thư mục public để phục vụ các tệp tĩnh (CSS, JS, hình ảnh, v.v.)
app.use(express.static(path.join(__dirname, 'public')));

// HTTP logger với Morgan
app.use(morgan('combined'));  // Ghi lại các yêu cầu HTTP theo định dạng 'combined'

app.engine('handlebars', engine({
    partialsDir: path.join(__dirname, '/resources/views/partials'),  // Đường dẫn tới partials
    layoutsDir: path.join(__dirname, '/resources/views/layouts'),    // Đường dẫn tới layouts (nếu có)
    defaultLayout: 'main',  // Đặt layout mặc định (nếu có)
}));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, '/resources/views'));

// Route chính
app.get('/', (req, res) => {
    res.render('home');  // Render home.handlebars từ views
});
app.get('/me', (req, res) => {
    res.render('me');
  });

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
