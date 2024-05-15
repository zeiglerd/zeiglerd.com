<?php // declare(strict_types=1);

namespace ZeiglerD\ZeiglerD\Controllers;

final class GeordieController extends \ZeiglerD\PhpEngine\Controller
{
  final public function index($Router, $Template) {
    $this->addScripts('/scripts/templates/%s/views/geordie/geordie-locale.min.js', true);
    $this->addScripts('/scripts/templates/%s/views/geordie/geordie.min.js');
  }
}
