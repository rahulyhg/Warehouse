<?php

use Illuminate\Database\Migrations\Migration;

class CreateContactsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('contacts', function ($table) {
            $table->increments('id');
            $table->string('name', 60);
            $table->string('email', 60);
            $table->string('phone', 60);
            $table->string('address', 120);
            $table->text('content');
            $table->string('company_name', 120)->nullable();
            $table->tinyInteger('is_read')->unsigned()->default(0);
            $table->softDeletes();
            $table->timestamps();
            $table->engine = 'InnoDB';

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('contacts');
    }
}
