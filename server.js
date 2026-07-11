const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Giả lập dữ liệu cho mục 2.3 của Người 3
let transactions = [
    { id: 1, sender: "Nguyễn Văn A", receiver: "Trần Thị B", amount: 5000000, status: "Thành công", hash: "0x8a3f...b2c1" },
    { id: 2, sender: "Lê Văn C", receiver: "Phạm Văn D", amount: 12000000, status: "Nghi vấn (AI Cảnh báo)", hash: "0x9e2d...f4a7" }
];

app.get('/api/transactions', (req, res) => {
    res.json(transactions);
});

app.post('/api/transactions', (req, res) => {
    const { sender, receiver, amount } = req.body;
    
    // Logic AI phát hiện rủi ro thời gian thực (Mục 2.3.1)
    let status = "Thành công";
    if (amount > 10000000) { 
        status = "Nghi vấn (AI Cảnh báo)"; 
    }

    const newTx = {
        id: transactions.length + 1,
        sender: sender || "Hệ thống",
        receiver,
        amount: parseInt(amount),
        status,
        hash: "0x" + Math.random().toString(16).substr(2, 8) + "...ftms" // Giả lập chuỗi khối Blockchain (Mục 2.3.5)
    };

    transactions.unshift(newTx);
    res.redirect('/');
});

// Trả về file index.html ngay khi truy cập vào trang chủ "/"
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});
app.use(express.static(__dirname));

app.listen(PORT, () => {
    console.log(`Server FTMS đang chạy tại: http://localhost:${PORT}`);
});