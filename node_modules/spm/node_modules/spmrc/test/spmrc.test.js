var fs = require('fs');
var path = require('path');
var should = require('should');
var spmrc = require('..');

describe('spmrc', function() {

  spmrc.spmrcfile = path.join(__dirname, './tmp/spmrc');

  it('get nothing', function() {
    spmrc.get().should.eql({});
  });

  it('get default values', function() {
    spmrc.get('install.path').should.equal('spm_modules');
    spmrc.get('registry').should.equal('http://spmjs.io');
  });

  it("write data", function() {
    spmrc.write({
      user: {
        username: "spm3"
      }
    });
    spmrc.get('user.username').should.equal('spm3');
  });

  it('set user.username = spm', function() {
    spmrc.set('user.username', 'spm');
  });

  it('get user.username', function() {
    spmrc.get('user.username').should.equal('spm');
  });

  it('set auth = spm', function() {
    spmrc.set('auth', 'spm');
  });

  it('get auth', function() {
    spmrc.get('auth').should.equal('spm');
  });

  it('get via config', function() {
    spmrc.config('user.username').should.equal('spm');
  });

  it('set via config', function() {
    spmrc.config('user.username', 'spmjs');
    spmrc.get('user.username').should.equal('spmjs');
  });

  it('get localrc', function() {
    var localrc = path.join(process.cwd(), '.spmrc');
    var content = "[user]\nusername = spmjs2";

    if (fs.existsSync(localrc)) {
      console.warn(".spmrc should not be hered")
      return;
    }

    fs.writeFileSync(localrc, content);
    spmrc.get('user.username').should.equal('spmjs2');
    fs.unlinkSync(localrc);
  });

  it('set section:title.key', function() {
    spmrc.set('section:title.key', 'value');
    spmrc.get('section:title.key').should.equal('value');
    spmrc.get('section.title.key').should.equal('value');
  });

  it('set section.title.key', function() {
    spmrc.set('section.title.key', 'value2');
    spmrc.get('section:title.key').should.equal('value2');
    spmrc.get('section.title.key').should.equal('value2');
  });

  after(function() {
    fs.unlinkSync(spmrc.spmrcfile);
  });
});
