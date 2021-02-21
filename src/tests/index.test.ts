import { expect } from 'chai';
import en from './en.json';
import fr from './fr.json';
import { Traduire, TransDataToInject } from '..';

const keys = {
  welcome: '',
  title: '',
  label: '',
};

type TranslationSet = typeof keys;

interface TranslationSets {
  [code: string]: TranslationSet;
}

const translations: TranslationSets = {
  en,
  fr,
}

const tEn = new Traduire<TranslationSet>('en', en);
const tFr = new Traduire<TranslationSet>('fr', fr);

const params: TransDataToInject = {
  username: 'Haci',
};
const paramsInvalid: TransDataToInject = {
  username2: 'Haci',
};

describe('Traduire', () => {
  it('should translate welcome to en', () => {
    expect(tEn._('welcome', params)).to.equal('Welcome ' + params.username);
  });
  it('should translate welcome to en with invalid params', () => {
    expect(tEn._('welcome', paramsInvalid)).to.equal('Welcome {username}');
  });
  it('should translate title to en', () => {
    expect(tEn._('title', params)).to.equal('Home page');
  });
  it('should translate welcome to fr', () => {
    expect(tFr._('welcome', params)).to.equal('Bienvenue ' + params.username);
  });
  it('should translate title to fr', () => {
    expect(tFr._('title', params)).to.equal('Page d\'accueil');
  });
});
