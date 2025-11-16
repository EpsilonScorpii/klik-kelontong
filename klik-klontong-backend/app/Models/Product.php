<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    /**
     * Kolom yang boleh diisi dari API.
     * Pastikan nama-nama ini SAMA PERSIS dengan di migrasi.
     */
    protected $fillable = [
        'name',
        'price',
        'stock',
        'category',
        'description',
        'discount_price',
        'image_url',
    ];
}
