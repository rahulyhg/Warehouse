<?php

namespace Botble\ACL\Http\Requests;

use Botble\Support\Http\Requests\Request;

class UpdatePasswordRequest extends Request
{

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     * @author Sang Nguyen
     */
    public function rules()
    {
        if (acl_get_current_user()->isSuperUser()) {
            return [
                'password' => 'required|min:6|max:60',
                'password_confirmation' => 'same:password',
            ];
        } else {
            return [
                'old_password' => 'required|min:6|max:60',
                'password' => 'required|min:6|max:60',
                'password_confirmation' => 'same:password',
            ];
        }
    }
}
