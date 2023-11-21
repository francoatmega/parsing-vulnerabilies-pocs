<?php

class User {
    public $name;
    public $profile;
    public $isAdmin;
}

if(isset($_REQUEST['sub'])) {
    
    $user = $_REQUEST['uname'];
    $pass = $_REQUEST['upassword'];

    // HERE SHOULD GET DB INFORMATION AND THEN SERIALIZE AN USER OBJECT WITH A MALICIOUS PROPERTY

    if($user === 'admin' && $pass === 'admin') {

        $new_user = new User();
        $new_user->name = 'Master Admin';
        $new_user->profile = 'Administrator';
        $new_user->isAdmin = true;

        setcookie("login", serialize($new_user), time() + (86400 * 30), "/");

        header("location:index.php");

    } else if ($user || $pass) {

        $new_user = new User();
        $new_user->name = $_REQUEST['uname'];
        $new_user->profile = 'Common User';
        $new_user->isAdmin = false;

        setcookie("login", serialize($new_user), time() + (86400 * 30), "/");

        header("location:index.php");

    } else {

        header("location:login.php?err=1");

    }
}
?>