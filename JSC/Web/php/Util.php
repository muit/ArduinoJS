<?php
function contact($email, $content)
{
	$to = "miguel_3c@hotmail.com";
	$subject = "Hi!";
	$body = $email+"<p>"+$content+"</p>";
	if (mail($to, $subject, $body)) {
		echo("<p>Email successfully sent!</p>");
	} else {
		echo("<p>Email delivery failed…</p>");
	}
}
 ?>