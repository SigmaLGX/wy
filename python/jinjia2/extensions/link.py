#!/user/bin/env python
# coding: utf-8

import re
from jinja2 import nodes
from jinja2.ext import Extension

from base import BaseExtension
from uri import UriExtension

# 创建一个自定义拓展类，继承 jinja2.ext.Extension
class LinkExtension(BaseExtension):
  # 定义该拓展的语句关键字，这里表示模版中的 {% uri "参数" %} 语句
  tags = set(["link"])

  def __init__(self, environment):
    # 初始化父类，必须这样写
    super(LinkExtension, self).__init__(environment)

    # 在 Jinja2 的环境变量中，添加属性
    # 这样，就可以在 env.xxx 来访问了
    environment.extend(
      link=self,
      link_support=True,
      link_list=[]
    )
  
  def ready(self):
    self.reset()

  def reset(self):
    self.environment.link_list = []
  
  # 重新 jinja2.ext.Extension 类的 parse 函数
  # 这里是处理模板中 {% uri %} 语句的主程序
  def parse(self, parser):
      # 进入此函数，即表示 {% uri %} 标签被找到了
      # 下面的代码，会获取当前 {% uri %} 语句所在模板的行号
      lineno = next(parser.stream).lineno

      # 获取 {% uri %} 语句中的参数，比如我们调用是 {% uri 'python' %},
      # 这里就会返回一个 jinja2.nodes.Const 类型的对象，其值是 'python'
      lang_type = parser.parse_expression()

      # 将参数封装为列表
      args = []
      if lang_type is not None:
        args.append(lang_type)

        # 下面代码，可以支持两个参数，参数之间，用逗号隔开，不过本例用不到
        # 这里先检查当前处理流的位置，是不是个逗号，是的话，再获取下一个参数
        # 不是的话，就在参数列表的最后，加一个空对象
        # if parser.stream.skip_if('comma'):
        #   args.append(parser.parser_expression())
        # else:
        #   args.append(nodes.Const(None))
      
      # 解析从 {% uri %} 标志开始，到 {% enduri %} 为止的中间所有语句
      # 将解析完的内容，帮到 body 里，并且将当前流的位置，移动到 {% enduri %} 后面
      # 因为我们这里，是单结束标签，所以不需要获取 body
      # body = parser.parse_statements(['name:enduri'], drop_needle=True)
      body = ''

      # 返回一个 CallBlock类型的节点，并将其之前取得的行号，设置在该节点中
      # 初始化 CallBlock 节点时，传入我们自定义的 _do_add_link 方法的调用，两个空列表，以及刚才解析后的语句内容 body
      return nodes.CallBlock(self.call_method('_do_add_link', args), [], [], body).set_lineno(lineno)
  
  # 添加资源
  def _do_add_link(self, url, caller):
    self.add_link(url)
    return ''
  
  # 添加资源
  def add_link(self, url):
    # 删除资源的前缀斜杠
    replace_reg = re.compile(r'^/*')
    url = replace_reg.sub('', url)
    # 加入集合中
    link_list = self.environment.link_list
    if url not in link_list:
      link_list.append(url)
  
  # 生成 link 标签
  def build_link(self):
    has_uri = hasattr(self.environment, 'uri')
    link_list = self.environment.link_list
    links = []
    for uri in link_list:
      print uri
      if has_uri:
        links.append('<link href="%s" rel="stylesheet" />' % self.environment.uri.query_resource(uri))
      else:
        links.append('<link href="%s" rel="stylesheet" />' % ('/' + uri))
    return '\n'.join(links)