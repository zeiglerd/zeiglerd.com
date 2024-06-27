<?php // declare(strict_types=1);

namespace ZeiglerD\ZeiglerD\Controllers;

final class GamesController extends \ZeiglerD\PhpEngine\Controller
{
  final public function cheddar($Router, $Template) {
    $this->addScripts([
      'views/games/cheddar/cheddar-locale.min.js',
      'views/games/cheddar/cheddar.min.js',
    ]);
    return $this->render([]);
  }

  final public function geordie($Router, $Template) {
    $this->addScripts([
      'views/games/geordie/geordie-locale.min.js',
      'views/games/geordie/geordie.min.js',
    ]);
    return $this->render([]);
  }
}
