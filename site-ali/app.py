from flask import Flask, render_template, request, jsonify
import orders

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/submit_order', methods=['POST'])
def submit_order():
    data = request.json
    address = data.get('address')
    cart = data.get('cart')
    order_data = {
        'address': address,
        'cart': cart
    }
    orders.add_order(order_data)
    return jsonify(success=True)

if __name__ == '__main__':
    app.run(debug=True)
