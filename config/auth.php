<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Defaults
    |--------------------------------------------------------------------------
    |
    | Estas opciones definen las configuraciones de guardia (guard) y de 
    | restablecimiento de contraseñas (passwords) que se utilizarán de forma
    | predeterminada.
    |
    */

    'defaults' => [
        'guard' => 'web',
        'passwords' => 'users',
    ],

    /*
    |--------------------------------------------------------------------------
    | Guards
    |--------------------------------------------------------------------------
    |
    | Aquí se definen los "guards" de autenticación para la aplicación. El guard
    | "web" utiliza el controlador de sesiones y cookies, mientras que el "api"
    | puede utilizar otro mecanismo, como tokens. En este ejemplo, se usa el 
    | driver "token" para API, pero en muchos casos se puede reemplazar por "sanctum"
    | o "jwt" según la implementación.
    |
    */

    'guards' => [
        'web' => [
            'driver' => 'session',
            'provider' => 'users',
        ],

        // 'api' => [
        //     'driver' => 'token',  // O puede configurarse a 'sanctum' o 'jwt' según tu necesidad.
        //     'provider' => 'users',
        //     'hash' => false,
        // ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Providers
    |--------------------------------------------------------------------------
    |
    | Aquí se definen los proveedores de usuarios para la autenticación. En este
    | ejemplo se utiliza Eloquent y se asocia con el modelo User.
    |
    */

    'providers' => [
        'users' => [
            'driver' => 'eloquent',
            'model' => App\Models\User::class,
        ],

        // Si prefieres usar la base de datos en lugar de Eloquent, descomenta:
        // 'users' => [
        //     'driver' => 'database',
        //     'table' => 'users',
        // ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Password Reset
    |--------------------------------------------------------------------------
    |
    | Aquí se definen las configuraciones para el restablecimiento de contraseñas.
    | Se especifica la tabla donde se almacenan los tokens, el tiempo de expiración,
    | y el límite de intentos.
    |
    */

    'passwords' => [
        'users' => [
            'provider' => 'users',
            'table' => 'password_resets',
            'expire' => 60,  // Tiempo en minutos en que expira el token de restablecimiento.
            'throttle' => 60,
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Password Confirmation Timeout
    |--------------------------------------------------------------------------
    |
    | Este valor define el número de segundos antes de que se requiera que el usuario
    | confirme su contraseña nuevamente.
    |
    */

    'password_timeout' => 10800,

];
