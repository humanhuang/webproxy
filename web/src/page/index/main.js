define('page/demo/main',
      ['common/lib/jquery', 'common/util/template'],
      function ($, TPL) {


            var Index = {
                  filterMode:null,
                  list: [],
                  count: 0,
                  $table_body: $('#j-table-body'),
                  $template_row: $('#t-table-row').html(),

                  init: function () {
                        console.log('init');
                        this.initSocket();
                        this.bindEvent();
                  },
                  initSocket: function () {
                        var self = this;
                        var ws = new WebSocket("ws://localhost:9002");
                        ws.on = ws.addEventListener;
                        ws.on('open', function () {
                        });

                        ws.on('message', function (event) {

                              var data = JSON.parse(event.data);

                              self.recieve(data);
                              self.list.push(data);

                        });

                        ws.on('close', function (event) {

                        });

                        ws.on('error', function (event) {

                        });
                  },
                  recieve: function (data) {

                        if(this.filterMode) {
                              var reg = new RegExp(this.filterMode);
                              if(  !data.processResponse['content-type'] || !reg.test(data.processResponse['content-type'])) {
                                    return ;
                              }
                        }

                        //console.log(data);

                        var request = data.processRequest,
                              response = data.processResponse,
                              timing = data.timing;

                        //各行变色
                        var className = '';
                        if (this.count++ % 2 == 0) {
                              className = 'tr-even';
                        }

                        //请求时间
                        var timeDuring = parseInt(timing.processResponseTime) - parseInt(timing.beforeRequestTime), timeBlock;
                        if (timeDuring > 1000) {
                              timeBlock = '<div class="time-block" style="background:RGBA(255, 0, 0, 1);width:' + timeDuring / 100 + 'px"></div>' + timeDuring + 'ms';
                        }
                        else if (timeDuring > 500) {
                              timeBlock = '<div class="time-block" style="background:RGBA(174, 172, 51, 1);width:' + timeDuring / 10 + 'px"></div>' + timeDuring + 'ms';
                        }
                        else {
                              timeBlock = '<div class="time-block" style="width:' + timeDuring / 2 + 'px"></div>' + timeDuring + 'ms';
                        }

                        //文件大小
                        var contentLength = (parseInt(response['content-length']) / 1024).toFixed(2), sizeBlock;
                        if(contentLength > 200) {
                              sizeBlock = '<div class="time-block" style="background:RGBA(255, 0, 0, 1);width:' + contentLength/10  + 'px"></div>' + contentLength + 'kb';
                        }
                        else if(contentLength > 100){
                              sizeBlock = '<div class="time-block" style="background:RGBA(174, 172, 51, 1);width:' + contentLength/5  + 'px"></div>'+ contentLength + 'kb';
                        }
                        else {
                              sizeBlock = '<div class="time-block" style="width:' + contentLength + 'px"></div>'+ contentLength + 'kb';
                        }


                        var obj = {
                              location: request.location,
                              method: request.method,
                              status: response.statusCode,
                              type: response['content-type'],
                              size: sizeBlock,
                              time: timeBlock,
                              className: className
                        };

                        var HTML = TPL.parse(this.$template_row, obj);

                        this.$table_body.prepend($(HTML));

                  },
                  bindEvent: function () {
                        $('#clear').click(function (e) {
                              Index.$table_body.html('');
                              Index.list = [];
                        });


                        $('.filter').on('click', 'li', function(e) {
                              var type = $(this).attr('data-type');
                              Index.filterMode = type;

                              $(this).addClass('filter-selected').siblings().removeClass('filter-selected');

                              Index.$table_body.html('');

                              $.each(Index.list, function(i, data) {
                                    Index.recieve(data);
                              });

                        });
                  }
            }



            return Index;
      });