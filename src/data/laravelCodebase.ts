export interface LaravelFile {
  path: string;
  category: 'config' | 'routes' | 'models' | 'controllers' | 'filament' | 'migrations' | 'seeders' | 'views' | 'support';
  description: string;
  content: string;
}

export const laravelFiles: LaravelFile[] = [
  {
    path: 'README.md',
    category: 'config',
    description: 'دليل التثبيت والتشغيل السريع لمشروع لارافيل 11 ولوحة فيلامنت',
    content: `# مشغل حدادة افرنجية وألمنيوم – المعلم زكريا جواد
## Laravel 11 + Blade + Tailwind CSS (RTL) + Filament v3 + MySQL 8

موقع تعريفي وتسويقي متكامل باللغة العربية (RTL) لمشغل المعلم زكريا جواد في لبنان لأعمال الألمنيوم المعماري والحدادة الإفرنجية المشغولة يدوياً وتصاميم الليزر CNC.

### المزايا التقنية
* **Laravel 11**: أحدث إصدار من إطار عمل لارافيل مع توجيه وتحكم خفيف وسريع.
* **Filament v3**: لوحة تحكم إدارية حديثة لإدارة الألبومات، الصور، رسائل الزبائن، وإعدادات الموقع.
* **Tailwind CSS (RTL)**: تصميم عصري بالكامل متوافق مع الهواتف ومبني على لوحة ألوان معدنية داكنة مع بريق ذهبي/عنبري.
* **تكامل واتساب المباشر**: أزرار عائمة وروابط مباشرة مع رسائل جاهزة \`https://wa.me/96171206898\`.
* **5 ألبومات أعمال**: ألمنيوم (أبواب، شبابيك، مطابخ، واجهات) وحدادة (أبواب، بوابات، درابزين).
* **حماية النماذج**: حقل Honeypot لمنع البوتات، تحقق من الحقول، وتسجيل الرسائل في قاعدة البيانات.

---

### خطوات التثبيت والتشغيل (Setup Steps)

1. **استنساخ المشروع وتثبيت الحزم:**
\`\`\`bash
composer install
npm install && npm run build
\`\`\`

2. **إعداد ملف البيئة:**
\`\`\`bash
cp .env.example .env
php artisan key:generate
\`\`\`

3. **إعداد قاعدة البيانات (MySQL):**
قم بتعديل بيانات الاتصال في \`.env\`:
\`\`\`env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=zakaria_workshop
DB_USERNAME=root
DB_PASSWORD=
\`\`\`

4. **تشغيل التهجيرات وتغذية البيانات الأولية (Migrate & Seed):**
\`\`\`bash
php artisan migrate --seed
\`\`\`

5. **ربط مجلد التخزين بالعام:**
\`\`\`bash
php artisan storage:link
\`\`\`

6. **بدء خادم التطوير:**
\`\`\`bash
php artisan serve
\`\`\`

---

### بيانات تسجيل الدخول للوحة التحكم (Filament Admin)
* **الرابط:** \`http://127.0.0.1:8000/admin\`
* **البريد الإلكتروني:** \`admin@zakaria-workshop.com\`
* **كلمة المرور:** \`password123\`
`,
  },
  {
    path: '.env.example',
    category: 'config',
    description: 'ملف البيئة الافتراضي لمشروع لارافيل',
    content: `APP_NAME="مشغل حدادة افرنجية وألمنيوم – المعلم زكريا جواد"
APP_ENV=local
APP_KEY=
APP_DEBUG=true
APP_TIMEZONE=Asia/Beirut
APP_URL=http://localhost:8000

APP_LOCALE=ar
APP_FALLBACK_LOCALE=ar
APP_FAKER_LOCALE=ar_SA

LOG_CHANNEL=stack
LOG_DEPRECATIONS_CHANNEL=null
LOG_LEVEL=debug

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=zakaria_workshop
DB_USERNAME=root
DB_PASSWORD=

SESSION_DRIVER=database
SESSION_LIFETIME=120
SESSION_ENCRYPT=false
SESSION_PATH=/
SESSION_DOMAIN=null

BROADCAST_CONNECTION=log
FILESYSTEM_DISK=public
QUEUE_CONNECTION=database

CACHE_STORE=database
CACHE_PREFIX=

MAIL_MAILER=smtp
MAIL_HOST=127.0.0.1
MAIL_PORT=1025
MAIL_USERNAME=null
MAIL_PASSWORD=null
MAIL_ENCRYPTION=null
MAIL_FROM_ADDRESS="info@zakaria-workshop.com"
MAIL_FROM_NAME="\${APP_NAME}"

# بيانات المعلم زكريا جواد
WORKSHOP_PHONE=96171206898
WORKSHOP_WHATSAPP=96171206898
`,
  },
  {
    path: 'routes/web.php',
    category: 'routes',
    description: 'مسارات الويب العامة والمحمية للواجهة الأمامية',
    content: `<?php

use Illuminate\\Support\\Facades\\Route;
use App\\Http\\Controllers\\HomeController;
use App\\Http\\Controllers\\AlbumController;
use App\\Http\\Controllers\\ServiceController;
use App\\Http\\Controllers\\ContactController;
use App\\Http\\Controllers\\PageController;
use App\\Http\\Controllers\\SitemapController;

/*
|--------------------------------------------------------------------------
| Web Routes - مشغل المعلم زكريا جواد
|--------------------------------------------------------------------------
*/

Route::middleware(['web', 'throttle:60,1'])->group(function () {
    // الصفحة الرئيسية
    Route::get('/', [HomeController::class, 'index'])->name('home');

    // صفحة من نحن
    Route::get('/about', [PageController::class, 'about'])->name('about');

    // خدماتنا (ألمنيوم / حدادة)
    Route::get('/services/{slug}', [ServiceController::class, 'show'])->name('services.show');

    // معرض الأعمال والألبومات
    Route::get('/gallery', [AlbumController::class, 'index'])->name('gallery.index');
    Route::get('/gallery/{slug}', [AlbumController::class, 'show'])->name('gallery.show');

    // صفحة تواصل معنا
    Route::get('/contact', [ContactController::class, 'show'])->name('contact.show');
    Route::post('/contact', [ContactController::class, 'store'])
        ->middleware('throttle:5,1')
        ->name('contact.store');

    // خريطة الموقع لمحركات البحث
    Route::get('/sitemap.xml', [SitemapController::class, 'index'])->name('sitemap');
});
`,
  },
  {
    path: 'app/Support/Whatsapp.php',
    category: 'support',
    description: 'مساعد إنشاء روابط واتساب بذكاء وتنظيف الأرقام',
    content: `<?php

namespace App\\Support;

class Whatsapp
{
    /**
     * إنشاء رابط wa.me نظيف متوافق مع المعايير اللبنانية والدولية
     */
    public static function link(?string $number, ?string $message = null): string
    {
        $number = preg_replace('/\\D/', '', $number ?? config('app.workshop_whatsapp', '96171206898'));
        
        // التأكد من وجود مفتاح لبنان 961
        if (!str_starts_with($number, '961')) {
            $number = '961' . ltrim($number, '0');
        }

        $url = 'https://wa.me/' . $number;
        if ($message) {
            $url .= '?text=' . urlencode($message);
        }

        return $url;
    }
}
`,
  },
  {
    path: 'app/Models/Album.php',
    category: 'models',
    description: 'موديل ألبوم الأعمال وعلاقته بالصور والخدمات',
    content: `<?php

namespace App\\Models;

use Illuminate\\Database\\Eloquent\\Factories\\HasFactory;
use Illuminate\\Database\\Eloquent\\Model;
use Illuminate\\Database\\Eloquent\\Relations\\BelongsTo;
use Illuminate\\Database\\Eloquent\\Relations\\HasMany;

class Album extends Model
{
    use HasFactory;

    protected $fillable = [
        'service_id',
        'slug',
        'title_ar',
        'title_en',
        'description',
        'cover_photo_id',
        'sort_order',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'sort_order' => 'integer',
    ];

    public function service(): BelongsTo
    {
        return $this->belongsTo(Service::class);
    }

    public function photos(): HasMany
    {
        return $this->hasMany(Photo::class)->orderBy('sort_order');
    }

    public function coverPhoto(): BelongsTo
    {
        return $this->belongsTo(Photo::class, 'cover_photo_id');
    }
}
`,
  },
  {
    path: 'app/Models/Photo.php',
    category: 'models',
    description: 'موديل صورة العمل وإمكانية تحديد صورة الغلاف والمصغرات',
    content: `<?php

namespace App\\Models;

use Illuminate\\Database\\Eloquent\\Factories\\HasFactory;
use Illuminate\\Database\\Eloquent\\Model;
use Illuminate\\Database\\Eloquent\\Relations\\BelongsTo;
use Illuminate\\Support\\Facades\\Storage;

class Photo extends Model
{
    use HasFactory;

    protected $fillable = [
        'album_id',
        'path',
        'thumb_path',
        'caption',
        'alt_text',
        'sort_order',
        'is_cover',
    ];

    protected $casts = [
        'is_cover' => 'boolean',
        'sort_order' => 'integer',
    ];

    public function album(): BelongsTo
    {
        return $this->belongsTo(Album::class);
    }

    public function getUrlAttribute(): string
    {
        if (str_starts_with($this->path, 'http')) {
            return $this->path;
        }
        return Storage::disk('public')->url($this->path);
    }
}
`,
  },
  {
    path: 'app/Models/Service.php',
    category: 'models',
    description: 'موديل خدمات الورشة (ألمنيوم / حدادة)',
    content: `<?php

namespace App\\Models;

use Illuminate\\Database\\Eloquent\\Factories\\HasFactory;
use Illuminate\\Database\\Eloquent\\Model;
use Illuminate\\Database\\Eloquent\\Relations\\HasMany;

class Service extends Model
{
    use HasFactory;

    protected $fillable = [
        'slug',
        'title_ar',
        'title_en',
        'short_description',
        'long_description',
        'icon',
        'cover_image',
        'sort_order',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'sort_order' => 'integer',
    ];

    public function albums(): HasMany
    {
        return $this->hasMany(Album::class)->orderBy('sort_order');
    }
}
`,
  },
  {
    path: 'app/Models/ContactMessage.php',
    category: 'models',
    description: 'موديل استقبال رسائل واستفسارات الزبائن من الموقع',
    content: `<?php

namespace App\\Models;

use Illuminate\\Database\\Eloquent\\Factories\\HasFactory;
use Illuminate\\Database\\Eloquent\\Model;

class ContactMessage extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'phone',
        'email',
        'subject',
        'message',
        'is_read',
        'ip_address',
        'user_agent',
    ];

    protected $casts = [
        'is_read' => 'boolean',
    ];
}
`,
  },
  {
    path: 'app/Models/Setting.php',
    category: 'models',
    description: 'موديل إعدادات المشغل (مفتاح وقيمة)',
    content: `<?php

namespace App\\Models;

use Illuminate\\Database\\Eloquent\\Factories\\HasFactory;
use Illuminate\\Database\\Eloquent\\Model;

class Setting extends Model
{
    use HasFactory;

    protected $fillable = ['key', 'value'];

    public static function get(string $key, ?string $default = null): ?string
    {
        $setting = static::where('key', $key)->first();
        return $setting ? $setting->value : $default;
    }

    public static function set(string $key, ?string $value): void
    {
        static::updateOrCreate(['key' => $key], ['value' => $value]);
    }
}
`,
  },
  {
    path: 'app/Http/Controllers/HomeController.php',
    category: 'controllers',
    description: 'تحكم الصفحة الرئيسية وتجهيز بيانات الخدمات والألبومات والإعدادات',
    content: `<?php

namespace App\\Http\\Controllers;

use App\\Models\\Service;
use App\\Models\\Album;
use App\\Models\\Setting;
use Illuminate\\View\\View;

class HomeController extends Controller
{
    public function index(): View
    {
        return view('home', [
            'services' => Service::where('is_active', true)->orderBy('sort_order')->get(),
            'featuredAlbums' => Album::where('is_active', true)
                ->with(['coverPhoto', 'service'])
                ->withCount('photos')
                ->orderBy('sort_order')
                ->take(5)
                ->get(),
            'settings' => Setting::pluck('value', 'key'),
        ]);
    }
}
`,
  },
  {
    path: 'app/Http/Controllers/AlbumController.php',
    category: 'controllers',
    description: 'تحكم عرض ألبومات الأعمال والتفاصيل مع شبكة الصور واللايت بوكس',
    content: `<?php

namespace App\\Http\\Controllers;

use App\\Models\\Album;
use Illuminate\\View\\View;

class AlbumController extends Controller
{
    public function index(): View
    {
        $albums = Album::where('is_active', true)
            ->with(['coverPhoto', 'service'])
            ->withCount('photos')
            ->orderBy('sort_order')
            ->get();

        return view('gallery.index', compact('albums'));
    }

    public function show(string $slug): View
    {
        $album = Album::where('slug', $slug)
            ->where('is_active', true)
            ->with(['photos', 'service'])
            ->firstOrFail();

        $related = Album::where('service_id', $album->service_id)
            ->where('id', '!=', $album->id)
            ->where('is_active', true)
            ->take(3)
            ->get();

        return view('gallery.show', compact('album', 'related'));
    }
}
`,
  },
  {
    path: 'app/Http/Controllers/ContactController.php',
    category: 'controllers',
    description: 'تحكم استلام نموذج التواصل، التحقق، الحماية من البوتات، وحفظ الرسائل',
    content: `<?php

namespace App\\Http\\Controllers;

use App\\Models\\ContactMessage;
use App\\Models\\Setting;
use Illuminate\\Http\\Request;
use Illuminate\\Http\\RedirectResponse;
use Illuminate\\View\\View;

class ContactController extends Controller
{
    public function show(): View
    {
        $settings = Setting::pluck('value', 'key');
        return view('contact', compact('settings'));
    }

    public function store(Request $request): RedirectResponse
    {
        // فحص حقل Honeypot لمنع البوتات
        if ($request->filled('company_url_check')) {
            return back()->with('success', 'تم استلام رسالتكم بنجاح!');
        }

        $validated = $request->validate([
            'name'    => 'required|string|max:100',
            'phone'   => 'required|string|max:30',
            'email'   => 'nullable|email|max:150',
            'subject' => 'nullable|string|max:150',
            'message' => 'required|string|max:2000',
        ]);

        ContactMessage::create($validated + [
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent(),
            'is_read'    => false,
        ]);

        return back()->with('success', 'شكراً لتواصلك! تم استلام رسالتك وسيتواصل معك المعلم زكريا جواد في أقرب وقت.');
    }
}
`,
  },
  {
    path: 'database/migrations/2024_01_01_000003_create_albums_table.php',
    category: 'migrations',
    description: 'تهجير جدول الألبومات وربطه بالخدمات وترتيب العرض',
    content: `<?php

use Illuminate\\Database\\Migrations\\Migration;
use Illuminate\\Database\\Schema\\Blueprint;
use Illuminate\\Support\\Facades\\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('albums', function (Blueprint $table) {
            $table->id();
            $table->foreignId('service_id')->constrained('services')->cascadeOnDelete();
            $table->string('slug', 150)->unique();
            $table->string('title_ar', 150);
            $table->string('title_en', 150)->nullable();
            $table->text('description')->nullable();
            $table->unsignedBigInteger('cover_photo_id')->nullable();
            $table->string('cover_image', 255)->nullable();
            $table->integer('sort_order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();

            $table->index(['service_id', 'sort_order']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('albums');
    }
};
`,
  },
  {
    path: 'database/migrations/2024_01_01_000004_create_photos_table.php',
    category: 'migrations',
    description: 'تهجير جدول صور المعرض مع مسارات التخزين والوصف',
    content: `<?php

use Illuminate\\Database\\Migrations\\Migration;
use Illuminate\\Database\\Schema\\Blueprint;
use Illuminate\\Support\\Facades\\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('photos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('album_id')->constrained('albums')->cascadeOnDelete();
            $table->string('path', 255);
            $table->string('thumb_path', 255)->nullable();
            $table->string('caption', 200)->nullable();
            $table->string('alt_text', 200)->nullable();
            $table->integer('sort_order')->default(0);
            $table->boolean('is_cover')->default(false);
            $table->timestamps();

            $table->index(['album_id', 'sort_order']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('photos');
    }
};
`,
  },
  {
    path: 'database/seeders/DatabaseSeeder.php',
    category: 'seeders',
    description: 'مغذي قاعدة البيانات الرئيسي الذي ينشئ المستخدم والإعدادات والألبومات الخمسة',
    content: `<?php

namespace Database\\Seeders;

use Illuminate\\Database\\Seeder;
use App\\Models\\User;
use Illuminate\\Support\\Facades\\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // مستخدم إدارة Filament
        User::updateOrCreate(
            ['email' => 'admin@zakaria-workshop.com'],
            [
                'name' => 'المعلم زكريا جواد',
                'password' => Hash::make('password123'),
                'role' => 'admin',
            ]
        );

        $this->call([
            SettingSeeder::class,
            ServiceSeeder::class,
            AlbumSeeder::class,
            PhotoSeeder::class,
        ]);
    }
}
`,
  },
  {
    path: 'resources/views/layouts/app.blade.php',
    category: 'views',
    description: 'قالب العرض الأساسي بلارافيل مع دعم كامل للـ RTL وخط كايرو',
    content: `<!DOCTYPE html>
<html lang="ar" dir="rtl" class="scroll-smooth">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@yield('title', 'مشغل حدادة افرنجية وألمنيوم – المعلم زكريا جواد')</title>
    <meta name="description" content="@yield('meta_description', 'مشغل حدادة افرنجية وألمنيوم بإدارة المعلم زكريا جواد - دقة في المواعيد، عمل متقن إبداعي، كفالة بعد التركيب.')">
    
    <!-- Open Graph -->
    <meta property="og:title" content="@yield('title', 'مشغل حدادة افرنجية وألمنيوم – المعلم زكريا جواد')">
    <meta property="og:description" content="دقة في المواعيد • عمل متقن إبداعي • كفالة بعد التركيب">
    <meta property="og:type" content="website">

    <!-- Fonts: Cairo & Inter -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">

    <!-- Tailwind CSS (Vite) -->
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body class="bg-stone-950 text-stone-100 font-sans antialiased selection:bg-amber-500 selection:text-stone-950">

    @include('partials.header')

    <main>
        @yield('content')
    </main>

    @include('partials.footer')

    @include('partials.whatsapp-float')

</body>
</html>
`,
  },
  {
    path: 'resources/views/partials/whatsapp-float.blade.php',
    category: 'views',
    description: 'الزر العائم للواتساب في أسفل يسار الشاشة مع رسالة ترحيب مخصصة',
    content: `<div class="fixed bottom-6 left-6 z-40 flex items-center gap-3" dir="rtl">
    <a href="{{ \\App\\Support\\Whatsapp::link(config('app.workshop_whatsapp', '96171206898'), 'مرحباً معلم زكريا، أريد الاستفسار عن خدمات المشغل.') }}"
       target="_blank"
       rel="noopener noreferrer"
       class="relative group w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white flex items-center justify-center shadow-2xl hover:scale-110 transition-all duration-300"
       title="محادثة فورية مع المعلم زكريا عبر واتساب">
        <span class="absolute -inset-1 rounded-full bg-emerald-500/40 animate-ping opacity-75"></span>
        <svg class="w-7 h-7 fill-white relative z-10" viewBox="0 0 24 24">
            <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.007c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.303-.058.116-.087.188-.173.289l-.26.302c-.087.087-.178.182-.076.357.102.174.454.748.974 1.211.669.596 1.233.78 1.407.867.173.087.275.072.376-.043.101-.116.433-.506.549-.68.116-.173.231-.144.39-.087s1.011.477 1.184.564.289.13.332.202c.043.072.043.419-.101.824z"/>
        </svg>
    </a>
</div>
`,
  },
];
