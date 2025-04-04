<?php declare(strict_types=1);

namespace ZeiglerD\PhpEngine\UnitTests;

use ZeiglerD\PhpEngine\UnitTests\Helpers\QueryableHtml;
use ZeiglerD\PhpEngine\UnitTests\Helpers\TestCase;

use ZeiglerD\PhpEngine\Router;
use ZeiglerD\PhpEngine\Toolkit;

final class RouterTest extends TestCase
{
  final protected function setUp(): void {
    $_SERVER["SERVER_NAME"] = "local.zeiglerd.com";
  }

  final protected function tearDown(): void {
    $_SERVER["SERVER_NAME"] = "";
    $_SERVER["REQUEST_URI"] = "";
  }

  final public function testHappyCase(): void {
    $_SERVER["REQUEST_URI"] = "/";

    $toolkit = new Toolkit;
    $router = new Router($toolkit);

    $this->assertEquals("dynamic", $router->action);
    $this->assertEquals([], $router->args);
    $this->assertEquals("ZeiglerD\PhpEngine\Controllers\HomeController", $router->Controller);
    $this->assertEquals("HomeController", $router->controller);
    $this->assertEquals(1, $router->isDynamic);
    $this->assertEquals("dynamic", $router->pureAction);
    $this->assertEquals("home", $router->pureController);
    $this->assertEquals("{$toolkit->Config->engineRoot}/templates/{$toolkit->Config->engineTheme}/views/home/home.phtml", $router->viewPath);
  }

  final public function testErrorController(): void {
    $_SERVER["REQUEST_URI"] = "/non/existing/route";

    $toolkit = new Toolkit;
    $router = new Router($toolkit);

    $this->assertEquals("error404", $router->action);
    $this->assertEquals(["route"], $router->args);
    // $this->assertEquals("{$toolkit->Config->projectNamespace}\PhpEngine\Controllers\ErrorController", $router->Controller);
    $this->assertEquals("ZeiglerD\PhpEngine\Controllers\ErrorController", $router->Controller);
    $this->assertEquals("ErrorController", $router->controller);
    $this->assertEquals(0, $router->isDynamic);
    $this->assertEquals("error404", $router->pureAction);
    $this->assertEquals("error", $router->pureController);
    // $this->assertEquals("{$toolkit->Config->projectRoot}/templates/{$toolkit->Config->projectTheme}/views/error/error404.phtml", $router->viewPath);
    $this->assertEquals("{$toolkit->Config->engineRoot}/templates/{$toolkit->Config->engineTheme}/views/error/error404.phtml", $router->viewPath);
  }

  final public function testHomeController(): void {
    $_SERVER["REQUEST_URI"] = "/home";

    $toolkit = new Toolkit;
    $router = new Router($toolkit);

    $this->assertEquals("dynamic", $router->action);
    $this->assertEquals([], $router->args);
    $this->assertEquals("ZeiglerD\PhpEngine\Controllers\HomeController", $router->Controller);
    $this->assertEquals("HomeController", $router->controller);
    $this->assertEquals(1, $router->isDynamic);
    $this->assertEquals("dynamic", $router->pureAction);
    $this->assertEquals("home", $router->pureController);
    $this->assertEquals("{$toolkit->Config->engineRoot}/templates/{$toolkit->Config->engineTheme}/views/home/home.phtml", $router->viewPath);
  }

  final public function testHomeControllerWithArgs(): void {
    $_SERVER["REQUEST_URI"] = "/home/arg1/arg2/arg3";
    $_SERVER["SERVER_NAME"] = "local.zeiglerd.com";

    $toolkit = new Toolkit;
    $router = new Router($toolkit);

    $this->assertEquals("dynamic", $router->action);
    $this->assertEquals(["arg1", "arg2", "arg3"], $router->args);
    $this->assertEquals("ZeiglerD\PhpEngine\Controllers\HomeController", $router->Controller);
    $this->assertEquals("HomeController", $router->controller);
    $this->assertEquals(1, $router->isDynamic);
    $this->assertEquals("dynamic", $router->pureAction);
    $this->assertEquals("home", $router->pureController);
    $this->assertEquals("{$toolkit->Config->engineRoot}/templates/{$toolkit->Config->engineTheme}/views/home/home.phtml", $router->viewPath);
  }

  final public function testPageController(): void {
    $_SERVER["REQUEST_URI"] = "/page/arg1/arg2";

    $toolkit = new Toolkit;
    $router = new Router($toolkit);

    $this->assertEquals("dynamic", $router->action);
    $this->assertEquals(["arg1", "arg2"], $router->args);
    $this->assertEquals("ZeiglerD\PhpEngine\Controllers\PageController", $router->Controller);
    $this->assertEquals("PageController", $router->controller);
    $this->assertEquals(1, $router->isDynamic);
    $this->assertEquals("dynamic", $router->pureAction);
    $this->assertEquals("page", $router->pureController);
    $this->assertEquals("{$toolkit->Config->engineRoot}/templates/core/views/page/page.phtml", $router->viewPath);
  }
}
