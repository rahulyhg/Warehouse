<?php

namespace Botble\Donation;

use Artisan;
use Botble\Base\Supports\Commands\Permission;
use Schema;
use Botble\Base\Interfaces\PluginInterface;

class Plugin implements PluginInterface
{

    /**
     * @return array
     * @author Sang Nguyen
     */
    public static function permissions()
    {
        return [
            [
                'name' => 'Donation',
                'flag' => 'donation.list',
                'is_feature' => true,
            ],
            [
                'name' => 'Create',
                'flag' => 'donation.create',
                'parent_flag' => 'donation.list',
            ],
            [
                'name' => 'Edit',
                'flag' => 'donation.edit',
                'parent_flag' => 'donation.list',
            ],
            [
                'name' => 'Delete',
                'flag' => 'donation.delete',
                'parent_flag' => 'donation.list',
            ]
        ];
    }

    /**
     * @author Sang Nguyen
     */
    public static function activate()
    {
        Permission::registerPermission(self::permissions());
        Artisan::call('migrate', [
            '--force' => true,
            '--path' => 'plugins/donation/database/migrations',
        ]);
    }

    /**
     * @author Sang Nguyen
     */
    public static function deactivate()
    {

    }

    /**
     * @author Sang Nguyen
     */
    public static function remove()
    {
        Permission::removePermission(self::permissions());
        Schema::dropIfExists('donation');
    }
}