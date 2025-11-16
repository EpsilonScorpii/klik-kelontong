<?php

namespace App\Http\Controllers;

use App\Models\Product; // <-- Gunakan Model Product
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage; // <-- Penting untuk file/gambar

class ProductController extends Controller
{
    /**
     * READ: Ambil semua produk.
     * Dipanggil oleh: GET /api/admin/products
     */
    public function index()
    {
        // Ambil semua produk, urutkan dari yang terbaru
        return Product::latest()->get();
    }

    /**
     * CREATE: Simpan produk baru.
     * Dipanggil oleh: POST /api/admin/products
     */
    public function store(Request $request)
    {
        // 1. Validasi input (SANGAT PENTING)
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|integer',
            'stock' => 'required|integer',
            'category' => 'nullable|string',
            'description' => 'nullable|string',
            'discount_price' => 'nullable|integer',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048', // Validasi file
        ]);

        $imageUrl = null;

        // 2. Logika Upload Gambar
        if ($request->hasFile('image')) {
            // Simpan file di 'storage/app/public/products'
            $path = $request->file('image')->store('public/products');
            // Dapatkan URL yang bisa diakses publik
            $imageUrl = Storage::url($path);
        }

        // 3. Simpan ke Database
        $product = Product::create([
            'name' => $validatedData['name'],
            'price' => $validatedData['price'],
            'stock' => $validatedData['stock'],
            'category' => $validatedData['category'],
            'description' => $validatedData['description'],
            'discount_price' => $validatedData['discount_price'],
            'image_url' => $imageUrl, // Simpan URL-nya
        ]);

        // 4. Kembalikan data produk baru (agar frontend bisa update state)
        return response()->json($product, 201); // 201 = Created
    }

    /**
     * UPDATE: Perbarui produk yang ada.
     * Dipanggil oleh: PUT /api/admin/products/{product}
     */
    public function update(Request $request, Product $product)
    {
        // (Sama seperti 'store', tapi sedikit berbeda)
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|integer',
            // ... (tambahkan validasi lain seperti di store) ...
            'image' => 'nullable|image|max:2048', // (Image tidak 'required' saat update)
        ]);

        $imageUrl = $product->image_url; // Ambil URL gambar yang lama

        // 1. Cek jika ada gambar BARU
        if ($request->hasFile('image')) {
            
            // 2. Hapus gambar LAMA (jika ada)
            if ($product->image_url) {
                // Ubah URL (misal: /storage/products/...) 
                // menjadi path (misal: public/products/...)
                $oldPath = str_replace('/storage/', 'public/', $product->image_url);
                Storage::delete($oldPath);
            }

            // 3. Simpan gambar BARU
            $path = $request->file('image')->store('public/products');
            $imageUrl = Storage::url($path);
        }

        // 4. Update data di Database
        $product->update([
            'name' => $validatedData['name'],
            'price' => $validatedData['price'],
            // ... (isi sisa fieldnya) ...
            'image_url' => $imageUrl, // Simpan URL baru (atau lama jika tidak diubah)
        ]);

        return response()->json($product); // Kembalikan produk yang terupdate
    }

    /**
     * DELETE: Hapus produk.
     * Dipanggil oleh: DELETE /api/admin/products/{product}
     */
    public function destroy(Product $product)
    {
        // 1. Hapus gambar dari storage (jika ada)
        if ($product->image_url) {
            $oldPath = str_replace('/storage/', 'public/', $product->image_url);
            Storage::delete($oldPath);
        }

        // 2. Hapus data dari database
        $product->delete();

        return response()->json(['message' => 'Produk berhasil dihapus']);
    }
}
