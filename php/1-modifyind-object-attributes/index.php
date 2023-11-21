<?php 

class User {
    public $name;
    public $profile;
    public $isAdmin;
}

if(!isset($_COOKIE["login"])) {
    // $_COOKIE is a variable and login is a cookie name 
	header("location:login.php");
} 

$user = unserialize($_COOKIE["login"]);
if (isset($user) && $user->isAdmin === false) {
    echo 'You\'re logged in<br><br>';
    echo "Helo <b>$user->name</b> your profile is <b>$user->profile</b>";

    echo '<a href="logout.php"><h2><font color="red">Logout</font></h2>';
} else if (isset($user) && $user->isAdmin === true) {
    echo 'You\'re logged in<br><br>';
    echo "Helo <b>$user->name</b> your profile is <b>$user->profile</b>";

    echo '<a href="#"><h2><font color="red">Show all users</font></h2><br>';
    echo '<a href="#"><h2><font color="red">Delete users</font></h2><br><br>';

    echo '<a href="logout.php"><h2><font color="red">Logout</font></h2>';
}

else {

    echo 'You\'re not logged in';

    echo '<a href="login.php"><h2><font color="red">Login</font></h2>';
}

?>


