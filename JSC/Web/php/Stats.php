<?php
function addVisit()
{
	$main_path = dirname(__FILE__).'/';
	$date = date('Y:m:d');
	$file_path = $main_path.'stats/visits.info';
	$fileToday_path = $main_path.'stats/visits/'.$date.'.info';
	
	if(file_exists($file_path))
	{
		$visits = (int)file_get_contents($file_path)+1;
		file_put_contents($file_path, (string)$visits);
	} 
	else 
	{
		$visits = '0';
		file_put_contents($file_path, $visits);
	}
		
	if(file_exists($fileToday_path))
	{
		$visits = (int)file_get_contents($fileToday_path)+1;
		file_put_contents($fileToday_path, (string)$visits);
	}
	else
	{
		$visitsToday = '0';
		file_put_contents($fileToday_path, $visitsToday);
	}
}
function setVisits($visits)
{
	$main_path = dirname(__FILE__).'/';
	file_put_contents($main_path.'stats/visits.info', $visits);
}
function setDateVisits($date, $visits)
{
	$main_path = dirname(__FILE__).'/';
	file_put_contents($main_path.'stats/visits/'.$date.'.info', $visits);
}
function getTotalVisits()
{
	$main_path = dirname(__FILE__).'/';
	$file_path = $main_path.'stats/visits.info';
	
	if(file_exists($file_path))
	{
		$visits = file_get_contents($file_path);
		return $visits;
	}
	else
		return '-';
}
function getTodayVisits()
{
	$main_path = dirname(__FILE__).'/';
	$date = date('Y:m:d');
	$fileToday_path = $main_path.'stats/visits/'.$date.'.info';
	
	if(file_exists($fileToday_path))
	{
		$visits = file_get_contents($fileToday_path);
		return $visits;
	}
	else
		return '-';
}
?>
