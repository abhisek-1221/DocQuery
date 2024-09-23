import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  
  const products = [
    { name: 'Macbook Pro M4 13inch', price: '$3,534', unitSold: '246 Unit', views: '6,416', totalPrice: '$1,643,642.95', status: 'Available' },
    { name: 'iPhone 15 Pro Max 2021', price: '$1,534', unitSold: '5146 unit', views: '3,526', totalPrice: '$1,643,642.95', status: 'Out of stock' },
    { name: 'Hoodie Uniqlo 124KDA', price: '$534', unitSold: '43 unit', views: '12,436', totalPrice: '$1,643,642.95', status: 'Available' },
    { name: 'New Balance 2345F', price: '$216', unitSold: '21 unit', views: '43,154', totalPrice: '$1,643,642.95', status: 'Out of stock' },
  ]
  
  export default function TopProducts() {
    return (
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Top Products</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product name</TableHead>
              <TableHead>Price per unit</TableHead>
              <TableHead>Unit sold</TableHead>
              <TableHead>Views</TableHead>
              <TableHead>Total price</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.name}>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>{product.unitSold}</TableCell>
                <TableCell>{product.views}</TableCell>
                <TableCell>{product.totalPrice}</TableCell>
                <TableCell>{product.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    )
  }