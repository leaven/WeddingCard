var conf = {
    namespace: 'zhuanti',
    statics: '/static',
    system: {
        repos: 'http://fis.baidu.com/repos'
    },
    server: {
        rewrite: true,
        libs: 'wise',
        clean: {
            exclude: "fisdata**,smarty**,rewrite**,index.php**,WEB-INF**"
        }
    },
    /**
     * 项目配置
     */
    project: {
        /**
         * 解释：指定项目编译后产出文件的编码。
         * @type {String}
         * @default
         */
        charset: 'utf8',
        /**
         * 文件MD5戳长度
         * @type {Number}
         * @default
         */
        md5Length: 7,
        /**
         * 设置md5与文件的连字符
         * @type {String}
         * @default
         */
        md5Connector: '_'
    },
    modules: {
        /**
         * 配置编译器插件，可以根据 文件后缀 将某种语言编译成标准的js、css、html语言。
         * fis对文件进行编译时，首先进入的是parser阶段，该阶段的定义是： 将非标准语言编译成标准的html、js、css语言。
         * 例如我们可以利用这个阶段的处理把coffee、前端模板文件编译成js，less、sass、compass编译成css。
         * 在该阶段配置的插件，实际调用的是 fis-parser-xxx，这是fis parser插件命名规范 所约束的。
         * parser插件通常不会内置，如需要相关插件，可以使用npm安装，具体说明请参考文档 插件调用机制。
         * 由于parser的主要职责是统一标准语言，因此它经常会和 roadmap.ext 配置配合使用，用于标记某个后缀的文件在parser阶段之后当做某种标准语言进行处理。
         * @type {Object}
         */
        parser: {
            /**
             * less后缀的文件使用fis-parser-less插件编译
             * 处理器支持数组，或者逗号分隔的字符串配置
             * @type {String | Array}
             */

            less: ['less'],
            tmpl: 'utc',
            po: 'po',
            //支持sass
            //=====================
            'sass': 'sass',
            'scss': 'sass',
            //支持coffee
            //=====================
            'coffee': 'coffee-script',
            // 'md' : 'marked',
            //模板
            //=====================
            'mustache': 'handlebars'
        },

        /**
         * 在fis对js、css和类html文件进行语言能力扩展之后调用的插件配置，可以根据 文件后缀 对文件进行后处理。
         * 该阶段的插件可以获取文件对象的完整requires信息。
         * fis内置的 fis-postprocessor-jswrapper 插件就是在这个阶段对js进行包装的。
         * 标准化处理之后，fis已经完成了对前端领域语言的 三种语言能力 扩展，此时文件对象的相关信息已经获取到了，
         * 这个阶段我们可以对文件进行一些相关处理，比如amd包装等。
         * fis内置的 fis-postprocessor-jswrapper 插件就是在这个阶段对js进行包装的。
         * @type {Object}
         */
        postprocessor: {
            tpl: 'require-async',
            html : 'require-async',
            js: 'jswrapper, require-async'
        },
        postpackager : ['autoload', 'simple'],
        /**
         * 单文件编译过程中的最后阶段，对文件进行优化。
         * @type {Object}
         * @default
         */
        optimizer: {
            /**
             * 优化js
             * 使用 fis-optimizer-uglify-js
             */
            js: 'uglify-js',
            /**
             * 优化css
             * 使用 fis-optimizer-clean-css
             */
            css: 'clean-css',
            /**
             * 优化png
             * 使用 fis-optimizer-png-compressor
             */
            png: 'png-compressor',
            tpl: 'smarty-xss,html-compress'
        },

        /**
         * 打包预处理插件
         * 在fis打包操作前调用的插件， 不管调用fis release命令时是否使用 --pack 参数，该插件均会被调用。
         * @type {Array | String}
         */
        prepackager: 'widget-inline',

        /**
         * 打包处理插件。
         * 'map', fis内置了打包插件 fis-packager-map，生成 map.json 文件
         * 调用fis release命令时，添加 --pack 参数，该插件才会被调用。
         * @type{Array|String}
         */
        packager: 'map',

        /**
         * 打包后处理csssprite的插件。
         * 'csssprites'，fis内置了spriter插件 fis-spriter-csssprites，支持自动css打包
         * 调用fis release命令时，添加 --pack 参数，该插件才会被调用。
         * @type {Array | String}
         */
        spriter: 'csssprites'

    },

    /**
     * 目录规范与域名配置
     */
    roadmap: {

        /**
         * 指定后缀名与标准化语言的映射关系
         * fis允许在前端开发中使用less、coffee、utc等非标准语言，并能利用插件将它们编译成标准的js、css语言。这个过程是由modules.parser配置的插件处理的。
         * 编译之后，less会变成css文件，那么，后续对于css的处理应该同样可以适用于less的生成文件，
         * 因此，这个时候需要通过配置告诉fis，less文件会编译为css文件，并在后续的处理过程中当做css文件对待
         * @type {Object}
         *
         */
        ext: {
            less: 'css',
            tmpl: 'js',
            po: 'json',
            sass: 'css',
            scss: 'css',
            coffee: 'js',
            md: 'html',
            mustache: 'js'
        },

        /**
         * 定制项目文件属性，包括但不限于 产出路径，访问url，资源id，默认依赖，文件类型。
         * roadmap.path配置是fis编译系中非常核心的机制，使用它可以控制文件编译后发布的路径或访问的url、操纵文件属性、为fis产出的资源表添加扩展信息，
         * 当fis创建一个内部的 file对象 时，会利用roadmap.path来匹配文件路径，如果命中，则将当前规则下的属性及其值赋给file对象，从而影响file对象的相关信息(发布路径、访问url、资源表属性等)。
         * roadmap.path是fis系统中资源定位的核心能力，具有非常重要的意义。由于fis自动化工具接管了js、css和类html语言的 资源定位能力，
         * 因此，用户在开发时只需使用相对路径对资源进行引用，fis编译时会根据roadmap.path的配置调整引用内容，并将代码产出到配置指定的位置，一切都配合的非常完美！
         * @type {Array}
         * 配置项
         *      - reg：用于匹配文件路径的正则(RegExp)或通配(String)。文件路径是相对项目根目录的路径，以 / 开头。
         *      - release：设置文件的产出路径。默认是文件相对项目根目录的路径，以 / 开头。该值可以设置为 false ，表示为不产出（unreleasable）文件。
         *      - url：指定文件的资源定位路径，以 / 开头。默认是 release 的值，url可以与发布路径 release 不一致。
         *      - query：指定文件的资源定位路径之后的query，比如'?t=123124132'。
         *      - id：指定文件的资源id。默认是 namespace + subpath 的值。
         *      - charset：指定文本文件的输出编码。默认是 utf8，可以制定为 gbk 或 gb2312等。
         *      - isHtmlLike：指定对文件进行html相关的 语言能力扩展
         *      - isJsLike：指定对文件进行js相关的 语言能力扩展
         *      - isCssLike：指定对文件进行css相关的 语言能力扩展
         *      - useCompile：指定文件是否经过fis的编译处理，如果为false，则该文件不会做任何编译处理。
         *      - useHash：指定文件产出后是否添加md5戳。默认只有js、css、图片文件会添加。
         *      - useDomain：指定文件引用处是否添加域名。
         *      - useCache：指定文件编译过程中是否创建缓存，默认值是 true。
         *      - useMap：指定fis在打包阶段是否将文件加入到map.json中索引。默认只有isJsLike、isCssLike、isMod的文件会加入表中
         *      - useParser：指定文件是否经过parser插件处理。默认为true，值为 false 时才会关闭。
         *      - usePreprocessor：指定文件是否经过preprocessor插件处理。默认为true，值为 false 时才会关闭。
         *      - useStandard：指定文件是否经过内置的三种语言标准化流程处理。默认为true，值为 false 时才会关闭。
         *      - usePostprocessor：指定文件是否经过postprocessor插件处理。默认为true，值为 false 时才会关闭。
         *      - useLint：指定文件是否经过lint插件处理。默认为true，值为 false 时才会关闭。
         *      - useTest：指定文件是否经过test插件处理。默认为true，值为 false 时才会关闭。
         *      - useOptimizer：指定文件是否经过optimizer插件处理
         *      - useSprite：指定文件是否进行csssprite处理。默认是 false，即不对单个文件进行csssprite操作的，而只对合并后的文件进行。fis release中使用 --pack 参数即可触发csssprite操作。
         *      - isMod：标记文件为组件化文件。被标记成组件化的文件会入map.json表。并且会对js文件进行组件化包装。
         *      - extras：在map.json中的附加数据，用于扩展map.json表的功能。
         *      - requires：默认依赖的资源id表，类型为Array。
         */
        path : [
            // Widget
            //=========================================
            // {
            //     reg : /^\/lib\/jquery.js/,
            //     release : '/lib/jsjquery.js',
            //     id : 'jquery',
            //     isMod : true
            // },
            // {
            //     reg : /^\/modules\/jquery\/jquery.js/,
            //     release : '/lib/jsjquery.js',
            //     id : 'jquery',
            //     isMod : true
            // },
//            {
//                reg : /^\/page\/\.js/i,
//                isMod : true,
//                useMap : true
//            },
            {
                //前端模板
                reg: '**.tmpl',

                release: false,
                useOptimizer:false,
                useCache: false
            },
            {
                reg : /^\/static\/(.*)\.js/,
                isMod : true,
                useMap : true
            },
            {
                reg: /\/page\/page\.js/,
                isMod: false,
                useMap: true
            },
            {
                reg : /^\/page\/.*js/,
                isMod : true,
                useMap : true
            },
            {
                reg : /^\/src\/.*/,
                release : false
            }
        ],
       // domain : "http://app.video.baidu.com/wisesearch/spa"
        domain : "http://www.wifimeishi.cn/wedding"
        // domain : "http://app.video.baidu.com/spa/waimai"
        /**
         * 设置静态资源的域名前缀
         * fis扩展了html、js、css的三种语言能力，并支持对资源的定位，定位包括 开发路径与发布路径的映射关系 以及 静态资源服务器域名设置。roadmap.domain节点就是用于控制该能力的配置。
         */
        //domain: 'http://vs5.bdstatic.com, http://vs6.bdstatic.com'
    },
    settings: {
        /**
         * 插件的运行配置节点。
         * 插件要工作，偶尔也需要配置数据，
         * 比如fis内置的fis-optimizer-uglify-js、fis-optimizer-clean-css，它们的配置都是fis直接传递的，具体细节可以查看相应源码。
         * 配置节点具有很强的规律性，请参考下面的例子
         * @type {Object}
         */
        parser: {
            bdtmpl: {
                LEFT_DELIMITER: '<%',
                RIGHT_DELIMITER: '%>'
            }

        },
        postprocessor: {
            /**
             * 用于自动包装js代码的插件。
             * 包装方式。可选值目前只有 'amd'
             * @type{Object}
             * @default
             */
            jswrapper: {
                type: 'amd'
            }
        },
        postpackager : {
            autoload : {
                scriptTag : "<!--SCRIPT_PLACEHOLDER-->",
                styleTag : "<!--STYLE_PLACEHOLDER-->",
                resourceMapTag : '<!--RESOURCEMAP_PLACEHOLDER-->',
                type : "requirejs"
            }
        }
    },
    // 打包配置
    pack: {
        "pkg/card.css": [
            "/page/card/**less"
        ],
        "pkg/page.css" : [
            "/page/**/**less"
        ],
        "pkg/index.css": [
            "/**less"
        ],
        "pkg/card.js": [
            "/page/card/**js"
        ],
        "pkg/page.js" : [
            "/page/**/**js"
        ],
        "pkg/lib.js" :[
             "/lib/**js"
        ]
    },
    'deploy': {
        //单元测试编译使用，请勿修改
        local: [
            {
                from : '/',
                to : "../spa/wedding/"
            },
            {
                from : '/page/index.html',
                to : "../spa/index.html"
            }
        ],
        wedding: [{
            //如果配置了receiver，fis会把文件逐个post到接收端上
            receiver: 'http://www.wifimeishi.cn/wedding/receiver.php',
            //从产出的结果的static目录下找文件
            from: '/',
            //上传目录从static下一级开始不包括static目录
            subOnly: true,
            //保存到远端机器的/home/fis/www/static目录下
            //这个参数会跟随post请求一起发送
            to: '/alidata/www/wap/wedding/',
            //to:'/',
            //支持对文件进行字符串替换
            // replace: {
            //     from: /\/static\/v3\//g,
            //     to: function() {
            //         return '/browse_static/v3/'
            //     }
            // },
            //某些后缀的文件不进行上传
            exclude: /.*\.(?:svn|cvs|tar|rar|psd).*/
        }],
        cp633: [{
            //如果配置了receiver，fis会把文件逐个post到接收端上
            receiver: 'http://cp01-rdqa-pool633.cp01.baidu.com:8088/receiver.php',
            //从产出的结果的static目录下找文件
            from: '/',
            //上传目录从static下一级开始不包括static目录
            subOnly: true,
            //保存到远端机器的/home/fis/www/static目录下
            //这个参数会跟随post请求一起发送
            to: '/home/video/explore-odp/webroot/yb',
            //支持对文件进行字符串替换
            // replace: {
            //     from: /\/static\/v3\//g,
            //     to: function() {
            //         return '/browse_static/v3/'
            //     }
            // },
            //某些后缀的文件不进行上传
            exclude: /.*\.(?:svn|cvs|tar|rar|psd).*/
        }],
        //使用fis release --dest static来使用这个配置
        remote: [{
            //如果配置了receiver，fis会把文件逐个post到接收端上
            receiver: 'http://cq01-rdqa-pool112.cq01.baidu.com:8088/receiver.php',
            //从产出的结果的static目录下找文件
            from: '/static',
            //上传目录从static下一级开始不包括static目录
            subOnly: true,
            //保存到远端机器的/home/fis/www/static目录下
            //这个参数会跟随post请求一起发送
            to: '/home/video/explore-odp/webroot/browse_static/yingbang/',
            //支持对文件进行字符串替换
            replace: {
                from: /\/static\/v3\//g,
                to: function() {
                    return '/browse_static/v3/'
                }
            },
            //某些后缀的文件不进行上传
            exclude: /.*\.(?:svn|cvs|tar|rar|psd).*/
        }, {
            //如果配置了receiver，fis会把文件逐个post到接收端上
            receiver: 'http://cq01-rdqa-pool112.cq01.baidu.com:8088/receiver.php',
            //从产出的结果的static目录下找文件
            from: '/template',
            //上传目录从static下一级开始不包括static目录
            subOnly: true,
            //保存到远端机器的/home/fis/www/static目录下
            //这个参数会跟随post请求一起发送
            to: '/home/video/explore-odp/template/browse_template/yingbang',
            //支持对文件进行字符串替换
            replace: {
                from: /\/static\/v3\//g,
                to: function() {
                    return '/browse_static/v3/'
                }
            },
            //某些后缀的文件不进行上传
            exclude: /.*\.(?:svn|cvs|tar|rar|psd).*/
        }, {
            //如果配置了receiver，fis会把文件逐个post到接收端上
            receiver: 'http://cq01-rdqa-pool112.cq01.baidu.com:8088/receiver.php',
            //从产出的结果的static目录下找文件
            from: '/config',
            //上传目录从static下一级开始不包括static目录
            subOnly: true,
            //支持对文件进行字符串替换
            replace: {
                from: /\/static\/v3\//g,
                to: function() {
                    return '/browse_static/v3/'
                }
            },
            //这个参数会跟随post请求一起发送
            to: '/home/video/explore-odp/template/browse_template_v3/config'
        }], //使用fis release --dest static来使用这个配置
        remote2: [{
            //支持对文件进行字符串替换
            replace: {
                from: /\/static\/v3\//g,
                to: function() {
                    return '/browse_static/v3/'
                }
            },
            //某些后缀的文件不进行上传
            exclude: /.*\.(?:svn|cvs|tar|rar|psd).*/
        }, {
            replace: {
                from: /\/static\/v3\//g,
                to: function() {
                    return '/browse_static/v3/'
                }
            }
        }]
    }
};



fis.config.init(conf);
