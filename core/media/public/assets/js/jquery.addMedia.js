/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 17);
/******/ })
/************************************************************************/
/******/ ({

/***/ 17:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(18);


/***/ }),

/***/ 18:
/***/ (function(module, exports) {

eval("var _typeof = typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; };\n\n/* ========================================================================\n * AddMedia.js v1.0\n * Requires Botble Media\n * ======================================================================== */\n\n+function ($) {\n    'use strict';\n\n    /**\n     * @param element\n     * @param options\n     * @constructor\n     */\n\n    var AddMedia = function AddMedia(element, options) {\n        this.options = options;\n        $(element).rvMedia({\n            multiple: true,\n            onSelectFiles: function onSelectFiles(files, $el) {\n                if (typeof files !== 'undefined') {\n                    switch ($el.data('editor')) {\n                        case 'summernote':\n                            handleInsertImagesForSummerNote($el, files);\n                            break;\n                        case 'wysihtml5':\n                            var editor = $(options.target).data('wysihtml5').editor;\n                            handleInsertImagesForWysihtml5Editor(editor, files);\n                            break;\n                        case 'ckeditor':\n                            handleForCkeditor($el, files);\n                            break;\n                        case 'tinymce':\n                            handleForTinyMce(files);\n                            break;\n                    }\n                }\n            }\n        });\n    };\n\n    AddMedia.VERSION = '1.1.0';\n\n    /**\n     * Insert images to summernote editor\n     * @param $el\n     * @param files\n     */\n    function handleInsertImagesForSummerNote($el, files) {\n        if (files.length === 0) {\n            return;\n        }\n\n        var instance = $el.data('target');\n        for (var i = 0; i < files.length; i++) {\n            if (files[i].type === 'youtube' || files[i].type === 'video') {\n                var link = files[i].full_url;\n                link = link.replace('watch?v=', 'embed/');\n                $(instance).summernote('pasteHTML', '<iframe width=\"420\" height=\"315\" src=\"' + link + '\" frameborder=\"0\" allowfullscreen></iframe>');\n            } else if (files[i].type === 'image') {\n                $(instance).summernote('insertImage', files[i].full_url, files[i].basename);\n            } else {\n                $(instance).summernote('pasteHTML', '<a href=\"' + files[i].full_url + '\">' + files[i].full_url + '</a>');\n            }\n        }\n    }\n\n    /**\n     * Insert images to Wysihtml5 editor\n     * @param editor\n     * @param files\n     */\n    function handleInsertImagesForWysihtml5Editor(editor, files) {\n        if (files.length === 0) {\n            return;\n        }\n\n        // insert images for the wysihtml5 editor\n        var s = '';\n        for (var i = 0; i < files.length; i++) {\n            if (files[i].type === 'youtube' || files[i].type === 'video') {\n                var link = files[i].full_url;\n                link = link.replace('watch?v=', 'embed/');\n                s += '<iframe width=\"420\" height=\"315\" src=\"' + link + '\" frameborder=\"0\" allowfullscreen></iframe>';\n            } else if (files[i].type === 'image') {\n                s += '<img src=\"' + files[i].full_url + '\">';\n            } else {\n                s += '<a href=\"' + files[i].full_url + '\">' + files[i].full_url + '</a>';\n            }\n        }\n\n        if (editor.getValue().length > 0) {\n            var length = editor.getValue();\n            editor.composer.commands.exec('insertHTML', s);\n            if (editor.getValue() === length) {\n                editor.setValue(editor.getValue() + s);\n            }\n        } else {\n            editor.setValue(editor.getValue() + s);\n        }\n    }\n\n    /**\n     * @param $el\n     * @param files\n     */\n    function handleForCkeditor($el, files) {\n        $.each(files, function (index, file) {\n            var link = file.full_url;\n            var instance = $el.data('target').replace('#', '');\n            if (file.type === 'youtube' || file.type === 'video') {\n                link = link.replace('watch?v=', 'embed/');\n                CKEDITOR.instances[instance].insertHtml('<iframe width=\"420\" height=\"315\" src=\"' + link + '\" frameborder=\"0\" allowfullscreen></iframe>');\n            } else if (file.type === 'image') {\n                CKEDITOR.instances[instance].insertHtml('<img src=\"' + link + '\" alt=\"' + file.name + '\" />');\n            } else {\n                CKEDITOR.instances[instance].insertHtml('<a href=\"' + link + '\">' + file.name + '</a>');\n            }\n        });\n    }\n\n    /**\n     * @param files\n     */\n    function handleForTinyMce(files) {\n        $.each(files, function (index, file) {\n            var link = file.url;\n            var html = '';\n            if (file.type === 'youtube' || file.type === 'video') {\n                link = link.replace('watch?v=', 'embed/');\n                html = '<iframe width=\"420\" height=\"315\" src=\"' + link + '\" frameborder=\"0\" allowfullscreen></iframe>';\n            } else if (file.type === 'image') {\n                html = '<img src=\"' + link + '\" alt=\"' + file.name + '\" />';\n            } else {\n                html = '<a href=\"' + link + '\">' + file.name + '</a>';\n            }\n            tinymce.activeEditor.execCommand('mceInsertContent', false, html);\n        });\n    }\n\n    /**\n     * @param option\n     */\n    function callAction(option) {\n        return this.each(function () {\n            var $this = $(this);\n            var data = $this.data('bs.media');\n            var options = $.extend({}, $this.data(), (typeof option === 'undefined' ? 'undefined' : _typeof(option)) === 'object' && option);\n            if (!data) $this.data('bs.media', data = new AddMedia(this, options));\n        });\n    }\n\n    $.fn.addMedia = callAction;\n    $.fn.addMedia.Constructor = AddMedia;\n\n    $(window).on('load', function () {\n        $('[data-type=\"rv-media\"]').each(function () {\n            var $addMedia = $(this);\n            callAction.call($addMedia, $addMedia.data());\n        });\n    });\n}(jQuery);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMTguanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vcmVzb3VyY2VzL2Fzc2V0cy9qcy9qcXVlcnkuYWRkTWVkaWEuanM/NDVmNyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqIEFkZE1lZGlhLmpzIHYxLjBcbiAqIFJlcXVpcmVzIEJvdGJsZSBNZWRpYVxuICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG5cbitmdW5jdGlvbiAoJCkge1xuICAgICd1c2Ugc3RyaWN0JztcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBlbGVtZW50XG4gICAgICogQHBhcmFtIG9wdGlvbnNcbiAgICAgKiBAY29uc3RydWN0b3JcbiAgICAgKi9cbiAgICB2YXIgQWRkTWVkaWEgPSBmdW5jdGlvbiAoZWxlbWVudCwgb3B0aW9ucykge1xuICAgICAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuICAgICAgICAkKGVsZW1lbnQpLnJ2TWVkaWEoe1xuICAgICAgICAgICAgbXVsdGlwbGU6IHRydWUsXG4gICAgICAgICAgICBvblNlbGVjdEZpbGVzOiBmdW5jdGlvbiAoZmlsZXMsICRlbCkge1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgZmlsZXMgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoJGVsLmRhdGEoJ2VkaXRvcicpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdzdW1tZXJub3RlJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYW5kbGVJbnNlcnRJbWFnZXNGb3JTdW1tZXJOb3RlKCRlbCwgZmlsZXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnd3lzaWh0bWw1JzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZWRpdG9yID0gJChvcHRpb25zLnRhcmdldCkuZGF0YSgnd3lzaWh0bWw1JykuZWRpdG9yO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRsZUluc2VydEltYWdlc0Zvcld5c2lodG1sNUVkaXRvcihlZGl0b3IsIGZpbGVzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2NrZWRpdG9yJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYW5kbGVGb3JDa2VkaXRvcigkZWwsIGZpbGVzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ3RpbnltY2UnOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRsZUZvclRpbnlNY2UoZmlsZXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgQWRkTWVkaWEuVkVSU0lPTiA9ICcxLjEuMCc7XG5cbiAgICAvKipcbiAgICAgKiBJbnNlcnQgaW1hZ2VzIHRvIHN1bW1lcm5vdGUgZWRpdG9yXG4gICAgICogQHBhcmFtICRlbFxuICAgICAqIEBwYXJhbSBmaWxlc1xuICAgICAqL1xuICAgIGZ1bmN0aW9uIGhhbmRsZUluc2VydEltYWdlc0ZvclN1bW1lck5vdGUoJGVsLCBmaWxlcykge1xuICAgICAgICBpZiAoZmlsZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgaW5zdGFuY2UgPSAkZWwuZGF0YSgndGFyZ2V0Jyk7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZmlsZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChmaWxlc1tpXS50eXBlID09PSAneW91dHViZScgfHwgZmlsZXNbaV0udHlwZSA9PT0gJ3ZpZGVvJykge1xuICAgICAgICAgICAgICAgIHZhciBsaW5rID0gZmlsZXNbaV0uZnVsbF91cmw7XG4gICAgICAgICAgICAgICAgbGluayA9IGxpbmsucmVwbGFjZSgnd2F0Y2g/dj0nLCAnZW1iZWQvJyk7XG4gICAgICAgICAgICAgICAgJChpbnN0YW5jZSkuc3VtbWVybm90ZSgncGFzdGVIVE1MJywgJzxpZnJhbWUgd2lkdGg9XCI0MjBcIiBoZWlnaHQ9XCIzMTVcIiBzcmM9XCInICsgbGluayArICdcIiBmcmFtZWJvcmRlcj1cIjBcIiBhbGxvd2Z1bGxzY3JlZW4+PC9pZnJhbWU+Jyk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGZpbGVzW2ldLnR5cGUgPT09ICdpbWFnZScpIHtcbiAgICAgICAgICAgICAgICAkKGluc3RhbmNlKS5zdW1tZXJub3RlKCdpbnNlcnRJbWFnZScsIGZpbGVzW2ldLmZ1bGxfdXJsLCBmaWxlc1tpXS5iYXNlbmFtZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICQoaW5zdGFuY2UpLnN1bW1lcm5vdGUoJ3Bhc3RlSFRNTCcsICc8YSBocmVmPVwiJyArIGZpbGVzW2ldLmZ1bGxfdXJsICsgJ1wiPicgKyBmaWxlc1tpXS5mdWxsX3VybCArICc8L2E+Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJbnNlcnQgaW1hZ2VzIHRvIFd5c2lodG1sNSBlZGl0b3JcbiAgICAgKiBAcGFyYW0gZWRpdG9yXG4gICAgICogQHBhcmFtIGZpbGVzXG4gICAgICovXG4gICAgZnVuY3Rpb24gaGFuZGxlSW5zZXJ0SW1hZ2VzRm9yV3lzaWh0bWw1RWRpdG9yKGVkaXRvciwgZmlsZXMpIHtcbiAgICAgICAgaWYgKGZpbGVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gaW5zZXJ0IGltYWdlcyBmb3IgdGhlIHd5c2lodG1sNSBlZGl0b3JcbiAgICAgICAgbGV0IHMgPSAnJztcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBmaWxlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKGZpbGVzW2ldLnR5cGUgPT09ICd5b3V0dWJlJyB8fCBmaWxlc1tpXS50eXBlID09PSAndmlkZW8nKSB7XG4gICAgICAgICAgICAgICAgdmFyIGxpbmsgPSBmaWxlc1tpXS5mdWxsX3VybDtcbiAgICAgICAgICAgICAgICBsaW5rID0gbGluay5yZXBsYWNlKCd3YXRjaD92PScsICdlbWJlZC8nKTtcbiAgICAgICAgICAgICAgICBzICs9ICc8aWZyYW1lIHdpZHRoPVwiNDIwXCIgaGVpZ2h0PVwiMzE1XCIgc3JjPVwiJyArIGxpbmsgKyAnXCIgZnJhbWVib3JkZXI9XCIwXCIgYWxsb3dmdWxsc2NyZWVuPjwvaWZyYW1lPic7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGZpbGVzW2ldLnR5cGUgPT09ICdpbWFnZScpIHtcbiAgICAgICAgICAgICAgICBzICs9ICc8aW1nIHNyYz1cIicgKyBmaWxlc1tpXS5mdWxsX3VybCArICdcIj4nO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzICs9ICc8YSBocmVmPVwiJyArIGZpbGVzW2ldLmZ1bGxfdXJsICsgJ1wiPicgKyBmaWxlc1tpXS5mdWxsX3VybCArICc8L2E+JztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChlZGl0b3IuZ2V0VmFsdWUoKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBsZXQgbGVuZ3RoID0gZWRpdG9yLmdldFZhbHVlKCk7XG4gICAgICAgICAgICBlZGl0b3IuY29tcG9zZXIuY29tbWFuZHMuZXhlYygnaW5zZXJ0SFRNTCcsIHMpO1xuICAgICAgICAgICAgaWYgKGVkaXRvci5nZXRWYWx1ZSgpID09PSBsZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBlZGl0b3Iuc2V0VmFsdWUoZWRpdG9yLmdldFZhbHVlKCkgKyBzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGVkaXRvci5zZXRWYWx1ZShlZGl0b3IuZ2V0VmFsdWUoKSArIHMpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtICRlbFxuICAgICAqIEBwYXJhbSBmaWxlc1xuICAgICAqL1xuICAgIGZ1bmN0aW9uIGhhbmRsZUZvckNrZWRpdG9yKCRlbCwgZmlsZXMpIHtcbiAgICAgICAgJC5lYWNoKGZpbGVzLCBmdW5jdGlvbiAoaW5kZXgsIGZpbGUpIHtcbiAgICAgICAgICAgIHZhciBsaW5rID0gZmlsZS5mdWxsX3VybDtcbiAgICAgICAgICAgIHZhciBpbnN0YW5jZSA9ICRlbC5kYXRhKCd0YXJnZXQnKS5yZXBsYWNlKCcjJywgJycpO1xuICAgICAgICAgICAgaWYgKGZpbGUudHlwZSA9PT0gJ3lvdXR1YmUnIHx8IGZpbGUudHlwZSA9PT0gJ3ZpZGVvJykge1xuICAgICAgICAgICAgICAgIGxpbmsgPSBsaW5rLnJlcGxhY2UoJ3dhdGNoP3Y9JywgJ2VtYmVkLycpO1xuICAgICAgICAgICAgICAgIENLRURJVE9SLmluc3RhbmNlc1tpbnN0YW5jZV0uaW5zZXJ0SHRtbCgnPGlmcmFtZSB3aWR0aD1cIjQyMFwiIGhlaWdodD1cIjMxNVwiIHNyYz1cIicgKyBsaW5rICsgJ1wiIGZyYW1lYm9yZGVyPVwiMFwiIGFsbG93ZnVsbHNjcmVlbj48L2lmcmFtZT4nKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZmlsZS50eXBlID09PSAnaW1hZ2UnKSB7XG4gICAgICAgICAgICAgICAgQ0tFRElUT1IuaW5zdGFuY2VzW2luc3RhbmNlXS5pbnNlcnRIdG1sKCc8aW1nIHNyYz1cIicgKyBsaW5rICsgJ1wiIGFsdD1cIicgKyBmaWxlLm5hbWUgKyAnXCIgLz4nKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgQ0tFRElUT1IuaW5zdGFuY2VzW2luc3RhbmNlXS5pbnNlcnRIdG1sKCc8YSBocmVmPVwiJyArIGxpbmsgKyAnXCI+JyArIGZpbGUubmFtZSArICc8L2E+Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBmaWxlc1xuICAgICAqL1xuICAgIGZ1bmN0aW9uIGhhbmRsZUZvclRpbnlNY2UoZmlsZXMpIHtcbiAgICAgICAgJC5lYWNoKGZpbGVzLCBmdW5jdGlvbiAoaW5kZXgsIGZpbGUpIHtcbiAgICAgICAgICAgIHZhciBsaW5rID0gZmlsZS51cmw7XG4gICAgICAgICAgICB2YXIgaHRtbCA9ICcnO1xuICAgICAgICAgICAgaWYgKGZpbGUudHlwZSA9PT0gJ3lvdXR1YmUnIHx8IGZpbGUudHlwZSA9PT0gJ3ZpZGVvJykge1xuICAgICAgICAgICAgICAgIGxpbmsgPSBsaW5rLnJlcGxhY2UoJ3dhdGNoP3Y9JywgJ2VtYmVkLycpO1xuICAgICAgICAgICAgICAgIGh0bWwgPSAnPGlmcmFtZSB3aWR0aD1cIjQyMFwiIGhlaWdodD1cIjMxNVwiIHNyYz1cIicgKyBsaW5rICsgJ1wiIGZyYW1lYm9yZGVyPVwiMFwiIGFsbG93ZnVsbHNjcmVlbj48L2lmcmFtZT4nO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChmaWxlLnR5cGUgPT09ICdpbWFnZScpIHtcbiAgICAgICAgICAgICAgICBodG1sID0gJzxpbWcgc3JjPVwiJyArIGxpbmsgKyAnXCIgYWx0PVwiJyArIGZpbGUubmFtZSArICdcIiAvPic7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGh0bWwgPSAnPGEgaHJlZj1cIicgKyBsaW5rICsgJ1wiPicgKyBmaWxlLm5hbWUgKyAnPC9hPic7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aW55bWNlLmFjdGl2ZUVkaXRvci5leGVjQ29tbWFuZCgnbWNlSW5zZXJ0Q29udGVudCcsIGZhbHNlLCBodG1sKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIG9wdGlvblxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGNhbGxBY3Rpb24ob3B0aW9uKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyICR0aGlzID0gJCh0aGlzKTtcbiAgICAgICAgICAgIHZhciBkYXRhID0gJHRoaXMuZGF0YSgnYnMubWVkaWEnKTtcbiAgICAgICAgICAgIHZhciBvcHRpb25zID0gJC5leHRlbmQoe30sICR0aGlzLmRhdGEoKSwgdHlwZW9mIG9wdGlvbiA9PT0gJ29iamVjdCcgJiYgb3B0aW9uKTtcbiAgICAgICAgICAgIGlmICghZGF0YSkgJHRoaXMuZGF0YSgnYnMubWVkaWEnLCAoZGF0YSA9IG5ldyBBZGRNZWRpYSh0aGlzLCBvcHRpb25zKSkpXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgJC5mbi5hZGRNZWRpYSA9IGNhbGxBY3Rpb247XG4gICAgJC5mbi5hZGRNZWRpYS5Db25zdHJ1Y3RvciA9IEFkZE1lZGlhO1xuXG4gICAgJCh3aW5kb3cpLm9uKCdsb2FkJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAkKCdbZGF0YS10eXBlPVwicnYtbWVkaWFcIl0nKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciAkYWRkTWVkaWEgPSAkKHRoaXMpO1xuICAgICAgICAgICAgY2FsbEFjdGlvbi5jYWxsKCRhZGRNZWRpYSwgJGFkZE1lZGlhLmRhdGEoKSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG59KGpRdWVyeSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gcmVzb3VyY2VzL2Fzc2V0cy9qcy9qcXVlcnkuYWRkTWVkaWEuanMiXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7O0FBS0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFiQTtBQWVBO0FBQ0E7QUFwQkE7QUFzQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///18\n");

/***/ })

/******/ });