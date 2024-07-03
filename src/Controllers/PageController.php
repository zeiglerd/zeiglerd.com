<?php // declare(strict_types=1);

namespace ZeiglerD\ZeiglerD\Controllers;

use ZeiglerD\PhpEngine\Controllers\PageController as Controller;
use ZeiglerD\PhpEngine\Helpers;
use ZeiglerD\PhpEngine\Models\Page;

final class PageController extends Controller
{
  const SENIOR_SOFTWARE_DEVELOPER_TITLE = 'Senior Software Developer';
  const SENIOR_SOFTWARE_DEVELOPER_PROFILE = 'Software developer with seven years of SaaS industry experience — working predominantly as a full-stack web developer within a JavaScript environment — leveraging cloud-based computing for scalable infrastructure solutions, and working alongside designers to create web applications utilizing JS, HTML5, and CSS3.';

  const SENIOR_SUPPORT_ENGINEER_TITLE = 'Senior Support Engineer';
  const SENIOR_SUPPORT_ENGINEER_PROFILE = 'Senior engineer with seven years of SaaS industry experience — working predominantly within an AWS and JS environment — triaging platform issues, communicating expectations with customers and key stakeholders, and documenting software and procedures to more quickly and effectively resolve future bugs and outages.';

  const SKILLS = [
    [
      'title' => 'Object-Oriented Programming',
      'prioritizedRoles' => [self::SENIOR_SOFTWARE_DEVELOPER_TITLE],
      'omittedRoles' => [self::SENIOR_SUPPORT_ENGINEER_TITLE],
      'keySkill' => true,
      'displayAsList' => false,
      'subSkills' => [
        [
          'title' => 'Classical',
          'keySkill' => true,
        ],
        [
          'title' => 'Prototypal Inheritance',
          'keySkill' => true,
        ],
      ],
    ],
    [
      'prioritizedRoles' => [self::SENIOR_SOFTWARE_DEVELOPER_TITLE],
      'omittedRoles' => [self::SENIOR_SUPPORT_ENGINEER_TITLE],
      'keySkill' => true,
      'displayAsList' => false,
      'subSkills' => [
        [
          'title' => 'Abstract Classes',
          'keySkill' => true,
        ],
        [
          'title' => 'Factories',
          'keySkill' => true,
        ],
        [
          'title' => 'Interfaces',
          'keySkill' => true,
        ],
      ],
    ],
    [
      'title' => 'Triaging and Resolving Issues Raised by Internal and External Customers',
      'prioritizedRoles' => [self::SENIOR_SUPPORT_ENGINEER_TITLE],
      'omittedRoles' => [self::SENIOR_SOFTWARE_DEVELOPER_TITLE],
      'keySkill' => true,
    ],
    [
      'title' => 'Creating Dev Tickets and Communicating Expectations with Key Stakeholders',
      'prioritizedRoles' => [self::SENIOR_SUPPORT_ENGINEER_TITLE],
      'omittedRoles' => [self::SENIOR_SOFTWARE_DEVELOPER_TITLE],
      'keySkill' => true,
    ],
    [
      'title' => 'Writing Software Documentation, READMEs, and CHANGELOGs',
      'prioritizedRoles' => [self::SENIOR_SUPPORT_ENGINEER_TITLE],
      'omittedRoles' => [self::SENIOR_SOFTWARE_DEVELOPER_TITLE],
      'keySkill' => true,
    ],
    [
      'title' => 'Delivering Platform and Software Training Internally and Externally',
      'prioritizedRoles' => [self::SENIOR_SUPPORT_ENGINEER_TITLE],
      'omittedRoles' => [self::SENIOR_SOFTWARE_DEVELOPER_TITLE],
      'keySkill' => true,
    ],
    [
      'prioritizedRoles' => [self::SENIOR_SOFTWARE_DEVELOPER_TITLE, self::SENIOR_SUPPORT_ENGINEER_TITLE],
      'keySkill' => true,
      'displayAsList' => false,
      'subSkills' => [
        [
          'title' => 'Backlog Planning',
          'keySkill' => true,
        ],
        [
          'title' => 'Prioritization',
          'keySkill' => true,
        ],
      ],
    ],
    [
      'prioritizedRoles' => [self::SENIOR_SOFTWARE_DEVELOPER_TITLE, self::SENIOR_SUPPORT_ENGINEER_TITLE],
      'keySkill' => true,
      'displayAsList' => false,
      'subSkills' => [
        [
          'title' => 'SaaS Web Platforms',
          'keySkill' => true,
        ],
        [
          'title' => 'Portals',
          'keySkill' => true,
        ],
        [
          'title' => 'Products',
          'keySkill' => true,
        ],
      ],
    ],
    [
      'title' => 'Scalable Microservices',
      'prioritizedRoles' => [self::SENIOR_SOFTWARE_DEVELOPER_TITLE, self::SENIOR_SUPPORT_ENGINEER_TITLE],
      'keySkill' => true,
    ],
    [
      'title' => 'Leadership of a Small Development Team (four members)',
      'prioritizedRoles' => [self::SENIOR_SOFTWARE_DEVELOPER_TITLE, self::SENIOR_SUPPORT_ENGINEER_TITLE],
      'keySkill' => true,
    ],
    [
      'title' => 'Training and Onboarding New Staff Members',
      'prioritizedRoles' => [self::SENIOR_SOFTWARE_DEVELOPER_TITLE, self::SENIOR_SUPPORT_ENGINEER_TITLE],
      'keySkill' => true,
    ],
    [
      'title' => 'Pair Programming',
      'prioritizedRoles' => [self::SENIOR_SOFTWARE_DEVELOPER_TITLE],
      'omittedRoles' => [self::SENIOR_SUPPORT_ENGINEER_TITLE],
      'keySkill' => true,
    ],
    [
      'title' => 'Agile and SCRUM Software Development',
      'prioritizedRoles' => [self::SENIOR_SOFTWARE_DEVELOPER_TITLE, self::SENIOR_SUPPORT_ENGINEER_TITLE],
      'keySkill' => true,
    ],
    [
      'title' => 'Feature Branch Workflow',
      'prioritizedRoles' => [self::SENIOR_SOFTWARE_DEVELOPER_TITLE, self::SENIOR_SUPPORT_ENGINEER_TITLE],
      'keySkill' => true,
    ],
    [
      'title' => 'Test Driven Development',
      'prioritizedRoles' => [self::SENIOR_SOFTWARE_DEVELOPER_TITLE],
      'omittedRoles' => [self::SENIOR_SUPPORT_ENGINEER_TITLE],
      'keySkill' => true,
    ],
    [
      'title' => 'JavaScript (<a href="https://ecma-international.org/" title="More About ECMAScript">ECMAScript</a>, MJS, and CJS)',
      'prioritizedRoles' => [self::SENIOR_SOFTWARE_DEVELOPER_TITLE],
      'keySkill' => true,
      'displayAsList' => true,
      'subSkills' => [
        [
          'title' => '<a href="https://nodejs.org/en" title="More About Node.js">Node.js</a>',
          'keySkill' => true,
          'displayAsList' => true,
          'subSkills' => [
            [
              'title' => '<a href="https://react.dev/" title="More About React">React</a>',
              'omittedRoles' => [self::SENIOR_SUPPORT_ENGINEER_TITLE],
              'keySkill' => true,
              'displayAsList' => true,
              'subSkills' => [
                [
                  'title' => 'Component Lifecycle',
                  'keySkill' => true,
                ],
                [
                  'title' => 'Functional Components',
                  'keySkill' => true,
                ],
                [
                  'title' => 'JavaScript XML (JSX)',
                  'keySkill' => true,
                ],
                [
                  'title' => '<a href="https://react-redux.js.org/" title="More About React">Redux</a>',
                  'keySkill' => true,
                ],
                [
                  'title' => 'Server-Side Rendering',
                  'keySkill' => true,
                ],
                [
                  'title' => 'State Management',
                  'keySkill' => true,
                ]
              ]
            ],
            [
              'title' => 'Lazy Loading',
              'omittedRoles' => [self::SENIOR_SUPPORT_ENGINEER_TITLE],
              'keySkill' => true,
            ],
            [
              'title' => 'Tree Shaking',
              'omittedRoles' => [self::SENIOR_SUPPORT_ENGINEER_TITLE],
              'keySkill' => true,
            ],
            [
              'title' => 'Additional Third-party Modules',
              'omittedRoles' => [self::SENIOR_SUPPORT_ENGINEER_TITLE],
              'keySkill' => true,
              'displayAsList' => false,
              'subSkills' => [
                [
                  'title' => '<a href="https://hapi.dev/" title="More About hapi">hapi Framework</a>',
                  'keySkill' => true,
                ],
                [
                  'title' => '<a href="https://lodash.com/" title="More About Lodash">Lodash</a>',
                  'keySkill' => true,
                ],
                [
                  'title' => '<a href="https://axios-http.com/" title="More About Axios">Axios</a>',
                  'keySkill' => true,
                ],
                [
                  'title' => '<a href="https://www.npmjs.com/package/nconf" title="More nconf">nconf</a>',
                  'keySkill' => true,
                ],
                [
                  'title' => '<a href="https://gruntjs.com/" title="More About Grunt.js">Grunt.js</a>',
                  'keySkill' => true,
                ],
              ],
            ],
            [
              'title' => 'Built-in Modules',
              'omittedRoles' => [self::SENIOR_SUPPORT_ENGINEER_TITLE],
              'keySkill' => true,
              'displayAsList' => false,
              'subSkills' => [
                [
                  'title' => 'fs',
                  'keySkill' => true,
                ],
                [
                  'title' => 'os',
                  'keySkill' => true,
                ],
                [
                  'title' => 'path',
                  'keySkill' => true,
                ],
                [
                  'title' => 'querystring',
                  'keySkill' => true,
                ],
                [
                  'title' => 'url',
                  'keySkill' => true,
                ],
              ],
            ],
          ]
        ],
        [
          'title' => '<a href="https://jquery.com/" title="More About jQuery">jQuery</a>',
          'keySkill' => true,
          'displayAsList' => true,
          'subSkills' => [
            [
              'title' => '<a href="https://api.jquery.com/jQuery.ajax/" title="More About AJAX">AJAX</a>',
              'omittedRoles' => [self::SENIOR_SUPPORT_ENGINEER_TITLE],
              'keySkill' => true,
            ],
          ],
        ],
        [
          'title' => 'Unit Testing',
          'omittedRoles' => [self::SENIOR_SUPPORT_ENGINEER_TITLE],
          'keySkill' => true,
          'displayAsList' => false,
          'subSkills' => [
            [
              'title' => '<a href="https://hapi.dev/module/lab/" title="More About @hapi/lab">@hapi/lab</a>',
              'keySkill' => true,
            ],
            [
              'title' => '<a href="https://hapi.dev/module/code/" title="More About @hapi/code">@hapi/code</a>',
              'keySkill' => true,
            ],
            [
              'title' => '<a href="https://jestjs.io/" title="More About Jest">Jest</a>',
              'keySkill' => true,
            ],
          ],
        ],
      ],
    ],
    [
      'title' => 'DevOps Practices',
      'prioritizedRoles' => [self::SENIOR_SOFTWARE_DEVELOPER_TITLE, self::SENIOR_SUPPORT_ENGINEER_TITLE],
      'keySkill' => true,
      'displayAsList' => true,
      'subSkills' => [
        [
          'title' => 'AWS',
          'keySkill' => true,
          'displayAsList' => false,
          'subSkills' => [
            [
              'title' => '<a href="https://aws.amazon.com/batch/" title="More About Batch">Batch</a>',
              'keySkill' => true,
            ],
            [
              'title' => '<a href="https://aws.amazon.com/ec2/" title="More About EC2">EC2</a>',
              'keySkill' => true,
            ],
            [
              'title' => '<a href="https://aws.amazon.com/ecs/" title="More About ECS">ECS</a>',
              'keySkill' => true,
            ],
            [
              'title' => '<a href="https://aws.amazon.com/lambda/" title="More About Lambda">Lambda</a>',
              'keySkill' => true,
            ],
            [
              'title' => '<a href="https://aws.amazon.com/rds/" title="More About RDS">RDS</a>',
              'keySkill' => true,
            ],
            [
              'title' => '<a href="https://aws.amazon.com/s3/" title="More About S3">S3</a>',
              'keySkill' => true,
            ],
            [
              'title' => '<a href="https://aws.amazon.com/security/" title="More About Security">Security</a>',
              'keySkill' => true,
            ],
            [
              'title' => '<a href="https://aws.amazon.com/sqs/" title="More About SQS">SQS</a> (FIFO)',
              'keySkill' => true,
            ],
            [
              'title' => '<a href="https://aws.amazon.com/systems-manager/features/#Parameter_Store" title="More About SSM">SSM</a>',
              'keySkill' => true,
            ],
          ],
        ],
        [
          'title' => 'Scalable Deployment Pipelines (CI/CD)',
          'keySkill' => true,
        ],
        [
          'keySkill' => true,
          'displayAsList' => false,
          'subSkills' => [
            [
              'title' => '<a href="https://git-scm.com/" title="More About Git">Git</a>',
              'keySkill' => true,
            ],
            [
              'title' => '<a href="https://github.com/" title="More About GitHub">GitHub</a>',
              'keySkill' => true,
            ],
            [
              'title' => '<a href="https://bitbucket.org/product/" title="More About Bitbucket">Bitbucket</a>',
              'keySkill' => true,
            ],
          ],
        ],
        [
          'title' => '<a href="https://www.terraform.io/" title="More About Terraform">Terraform</a> (IaC)',
          'keySkill' => true,
        ],
        [
          'title' => '<a href="https://www.jenkins.io/" title="More About Jenkins">Jenkins</a>',
          'keySkill' => true,
        ],
        [
          'title' => 'Bash and Ubuntu Server',
          'keySkill' => true,
        ],
        [
          'title' => 'cronjobs',
          'keySkill' => true,
        ],
      ],
    ],
    [
      'title' => '<a href="https://www.mysql.com/" title="More About MySQL">MySQL</a> Databases',
      'prioritizedRoles' => [self::SENIOR_SOFTWARE_DEVELOPER_TITLE, self::SENIOR_SUPPORT_ENGINEER_TITLE],
      'keySkill' => true,
    ],
    [
      'title' => '<a href="https://sequelize.org/" title="More About Sequelize">Sequelize</a> (ORM)',
      'prioritizedRoles' => [self::SENIOR_SOFTWARE_DEVELOPER_TITLE],
      'omittedRoles' => [self::SENIOR_SUPPORT_ENGINEER_TITLE],
      'keySkill' => true,
    ],
    [
      'title' => '<a href="https://www.liquibase.com/" title="More About Liquibase">Liquibase</a>',
      'prioritizedRoles' => [self::SENIOR_SOFTWARE_DEVELOPER_TITLE],
      'omittedRoles' => [self::SENIOR_SUPPORT_ENGINEER_TITLE],
      'keySkill' => true,
    ],
    [
      'title' => '<a href="https://www.elastic.co/" title="More About Elasticsearch">Elasticsearch</a> Indices',
      'prioritizedRoles' => [self::SENIOR_SOFTWARE_DEVELOPER_TITLE, self::SENIOR_SUPPORT_ENGINEER_TITLE],
      'keySkill' => true,
    ],
    [
      'title' => '<a href="https://swagger.io/specification/" title="More About Swagger">Swagger</a> (OpenAPI Specification)',
      'prioritizedRoles' => [self::SENIOR_SOFTWARE_DEVELOPER_TITLE, self::SENIOR_SUPPORT_ENGINEER_TITLE],
      'keySkill' => true,
    ],
    [
      'prioritizedRoles' => [self::SENIOR_SOFTWARE_DEVELOPER_TITLE],
      'omittedRoles' => [self::SENIOR_SUPPORT_ENGINEER_TITLE],
      'keySkill' => true,
      'displayAsList' => false,
      'subSkills' => [
        [
          'title' => '<a href="https://sass-lang.com/" title="More About SASS">SASS</a>',
          'keySkill' => true,
        ],
        [
          'title' => '<a href="https://lesscss.org/" title="More About LESS">LESS</a>',
          'keySkill' => true,
        ],
        [
          'title' => 'CSS3',
          'keySkill' => true,
        ],
      ],
    ],
    [
      'title' => 'HTML5 Hierarchy and Semantics',
      'prioritizedRoles' => [self::SENIOR_SOFTWARE_DEVELOPER_TITLE, self::SENIOR_SUPPORT_ENGINEER_TITLE],
      'keySkill' => true,
    ],
    [
      'title' => 'Web Accessibility (ADA Compliance)',
      'prioritizedRoles' => [self::SENIOR_SOFTWARE_DEVELOPER_TITLE, self::SENIOR_SUPPORT_ENGINEER_TITLE],
      'keySkill' => true,
    ],
    [
      'title' => '<a href="https://semver.org/" title="More About SemVer">Semantic Versioning</a>',
      'prioritizedRoles' => [self::SENIOR_SOFTWARE_DEVELOPER_TITLE],
      'omittedRoles' => [self::SENIOR_SUPPORT_ENGINEER_TITLE],
      'keySkill' => true,
    ],
    [
      'title' => 'Monolithic Java Web Apps and APIs (<a href="https://grails.org/" title="Grails">Grails</a> and Custom Frameworks)',
      'prioritizedRoles' => [self::SENIOR_SOFTWARE_DEVELOPER_TITLE, self::SENIOR_SUPPORT_ENGINEER_TITLE],
      'keySkill' => true,
    ],
    [
      'title' => 'Monolithic PHP Web Apps and APIs (<a href="https://framework.zend.com/" title="More About Zend Framework">Zend</a> and Custom Frameworks)',
      'prioritizedRoles' => [self::SENIOR_SOFTWARE_DEVELOPER_TITLE, self::SENIOR_SUPPORT_ENGINEER_TITLE],
      'keySkill' => true,
    ],
    [
      'title' => 'Content Management Systems (namely <a href="https://wordpress.com/" title="More About WordPress">WordPress</a> and WordPress Multisite)',
      'prioritizedRoles' => [self::SENIOR_SOFTWARE_DEVELOPER_TITLE, self::SENIOR_SUPPORT_ENGINEER_TITLE],
      'keySkill' => true,
    ],
    [
      'title' => '<a href="https://www.python.org/" title="More About Python">Python</a>',
      'prioritizedRoles' => [self::SENIOR_SOFTWARE_DEVELOPER_TITLE],
      'keySkill' => false,
    ],
    [
      'title' => '<a href="https://reactnative.dev/" title="More About React Native">React Native</a>',
      'prioritizedRoles' => [self::SENIOR_SOFTWARE_DEVELOPER_TITLE],
      'omittedRoles' => [self::SENIOR_SUPPORT_ENGINEER_TITLE],
      'keySkill' => false,
    ],
    [
      'title' => '<a href="https://www.typescriptlang.org/" title="More About TypeScript">TypeScript</a>',
      'prioritizedRoles' => [self::SENIOR_SOFTWARE_DEVELOPER_TITLE],
      'keySkill' => false,
    ],
    [
      'prioritizedRoles' => [self::SENIOR_SOFTWARE_DEVELOPER_TITLE],
      'omittedRoles' => [self::SENIOR_SUPPORT_ENGINEER_TITLE],
      'keySkill' => false,
      'displayAsList' => false,
      'subSkills' => [
        [
          'title' => '<a href="https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API" title="More About WebSockets">WebSockets</a>',
          'keySkill' => false,
        ],
        [
          'title' => '<a href="https://socket.io/" title="More About Socket.IO">Socket.IO</a>',
          'keySkill' => false,
        ],
      ],
    ],
    [
      'title' => '<a href="https://angularjs.org/" title="More About AngularJS">AngularJS</a>',
      'prioritizedRoles' => [self::SENIOR_SOFTWARE_DEVELOPER_TITLE],
      'omittedRoles' => [self::SENIOR_SUPPORT_ENGINEER_TITLE],
      'keySkill' => false,
    ],
    [
      'title' => '<a href="https://www.mongodb.com/" title="More About MongoDB">MongoDB</a> (and other NoSQL flavors)',
      'prioritizedRoles' => [self::SENIOR_SOFTWARE_DEVELOPER_TITLE],
      'keySkill' => false,
    ],
    [
      'title' => '<a href="https://memcached.org/" title="More About Memcached">Memcached</a>',
      'prioritizedRoles' => [self::SENIOR_SOFTWARE_DEVELOPER_TITLE],
      'omittedRoles' => [self::SENIOR_SUPPORT_ENGINEER_TITLE],
      'keySkill' => false,
    ],
    [
      'title' => '<a href="https://expressjs.com/" title="More About Express">Express</a>',
      'prioritizedRoles' => [self::SENIOR_SOFTWARE_DEVELOPER_TITLE],
      'omittedRoles' => [self::SENIOR_SUPPORT_ENGINEER_TITLE],
      'keySkill' => false,
    ],
    [
      'title' => 'Regular Expressions',
      'prioritizedRoles' => [self::SENIOR_SOFTWARE_DEVELOPER_TITLE],
      'keySkill' => false,
    ],
    [
      'title' => '<a href="https://konghq.com/" title="More About Kong API Gateway">Kong API Gateway</a>',
      'prioritizedRoles' => [self::SENIOR_SOFTWARE_DEVELOPER_TITLE],
      'keySkill' => false,
    ],
    [
      'title' => 'AWS',
      'prioritizedRoles' => [self::SENIOR_SOFTWARE_DEVELOPER_TITLE],
      'keySkill' => false,
      'displayAsList' => false,
      'subSkills' => [
        [
          'title' => '<a href="https://aws.amazon.com/api-gateway/" title="More About API Gateway">API Gateway</a>',
          'keySkill' => false,
        ],
        [
          'title' => '<a href="https://aws.amazon.com/cli/" title="More About CLI">CLI</a>',
          'keySkill' => false,
        ],
        [
          'title' => '<a href="https://aws.amazon.com/documentdb/" title="More About DocumentDB">DocumentDB</a>',
          'keySkill' => false,
        ],
        [
          'title' => '<a href="https://aws.amazon.com/sns/" title="More About SNS">SNS</a>',
          'keySkill' => false,
        ],
        [
          'title' => '<a href="https://aws.amazon.com/step-functions/" title="More About Step Functions">Step Functions</a>',
          'keySkill' => false,
        ],
      ],
    ],
  ];

  public final function generateKeySkills() {
    $filtered = array_filter(self::SKILLS, function($skill) {
      return isset($skill['keySkill']) && $skill['keySkill'];
    });
    return $this->generateSkills($filtered);
  }

  public final function generateAdditionalSkills() {
    $filtered = array_filter(self::SKILLS, function($skill) {
      return !isset($skill['keySkill']) || !$skill['keySkill'];
    });
    return $this->generateSkills($filtered);
  }

  public final function generateSkills($filtered, $english = false) {
    $notOmitted = array_filter($filtered, function($skill) {
      return isset($skill['omittedRoles']) ? !in_array($this->getResumeTitle(), $skill['omittedRoles']) : true;
    });

    $prioritized = array_filter($notOmitted, function($skill) {
      return isset($skill['prioritizedRoles']) ?
        in_array($this->getResumeTitle(), $skill['prioritizedRoles'])
        : false;
    });

    $unprioritized = array_filter($notOmitted, function($skill) {
      return isset($skill['prioritizedRoles'])
        ? !in_array($this->getResumeTitle(), $skill['prioritizedRoles'])
        : true;
    });

    $skills = [...$prioritized, ...$unprioritized];

    $size = count($skills);
    $markup = '';
    $i = 0;
    foreach ($skills as $key => $skill) {
      $markup .= $english ? '' : '<li>';
      if (empty($skill['subSkills'])) {
        $markup .= empty($skill['title']) ? '' : $skill['title'];
        $markup .= $english && $size > 2 && $i < $size - 1 ? ', ' : '';
        // $markup .= $english && $size > 1 && ($i > $size - 3 && $i < $size - 1) ? ' and ' : '';
        $markup .= $english && $size > 1 && $size < 3 && ($i > $size - 3 && $i < $size - 1) ? ' and ' : '';
      } else {
        if (!empty($skill['displayAsList'])) {
          $markup .= '<p>';
          $markup .= empty($skill['title']) ? '' : $skill['title'];
          $markup .= '</p>';
          $markup .= '<ul>';
          $markup .= $this->generateSkills($skill['subSkills']);
          $markup .= '</ul>';
        } else {
          $markup .= empty($skill['title']) ? '' : "{$skill['title']}: ";
          $markup .= $this->generateSkills($skill['subSkills'], true);
        }
      }
      $markup .= $english ? '' : '</li>';
      $i++;
    }

    return $markup;
  }

  public final function getResumeTitle() {
    return $this->t->Helpers->getHttpGet('title', self::SENIOR_SOFTWARE_DEVELOPER_TITLE);
  }

  public final function getResumeProfile() {
    switch ($this->getResumeTitle()) {
      case self::SENIOR_SOFTWARE_DEVELOPER_TITLE:
        return self::SENIOR_SOFTWARE_DEVELOPER_PROFILE;
      case self::SENIOR_SUPPORT_ENGINEER_TITLE:
        return self::SENIOR_SUPPORT_ENGINEER_PROFILE;
    }
  }
}
