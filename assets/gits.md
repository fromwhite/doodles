### 同一台电脑两个git账号
***

##### 有时候，我们需要将个人账号和公司账号区分，这时候我们就会需要在一台电脑上使用2个不同的Git账号
* 创建public key. 
```
ssh-keygen -t rsa -C "vinc@foxmail.com" 不要直接enter结束创建。选择保存位置时，给重新起个名字id_rsa_vinc 同时创建个人rsa public key.
ssh-keygen -t rsa -C "work@qq.com"
```
* 查看系统ssh-key代理 
```
$ ssh-add -l 
Could not open a connection to your authentication agent. 
如果发现上面的提示,说明系统代理里没有任何key,执行如下操作 
exec ssh-agent bash
系统已经有ssh-key 代理 ,执行下面的命令可以删除
$ ssh-add -D
```
如果系统提示：could not open a connection to your authentication agent
则需要执行一下命令：
```
ssh-agent bash
```
然后再执行上述的ssh-add id_rsa命令
* 把 .ssh 目录下的2个私钥添加的 ssh-agent 
```
$ ssh-add ~/.ssh/id_rsa_vinc ssh-add ~/.ssh/id_rsa_work
```
* 打开github ssh 管理页面把 对应的公钥提交保存到代码管理服务器 (.pub 结尾)
* 在 .ssh 目录创建 config 配置文件 
```
#vinc (github 配置) github环境配置
Host vinc 
HostName github.com 
User git 
IdentityFile ~/.ssh/id_rsa_vinc

#work (gitlib 配置) work环境配置
Host vinc 
HostName gitlib.com 
User git 
IdentityFile ~/.ssh/id_rsa_work
```
* 记住上面一步 Host 里设置的别名,开始克隆项目,以开github为例 
```
原来 git clone git@github.com:vvinc/dev.git
```
```
现在 git clone vinc:vvinc/dev.git

```
* 记得给这个仓库设置局部的用户名和邮箱
```
$ git config user.name "vinc" ; git config user.email "vvinc@foxmail.com"

$ git config user.name "work" ; git config user.email "work_email"
```
***

* .git/index.lock
```
$ rm -f ./.git/index.lock
```

to be continued