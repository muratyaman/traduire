# traduire
simple i18n translator using explicit typescript models

```typescript
import en from './en.json';
import fr from './fr.json';
import { Traduire, TransDataToInject } from 'traduire';

// this is expected structure in JSON files: Record<string, string>
const sample = {
  welcome: '',
  title: '',
  label: '',
};

// infer type from sample data
type TranslationSet = typeof sample;

interface TranslationSets {
  [code: string]: TranslationSet;
}

// this line would tell you if JSON files are incorrect
const translations: TranslationSets = {
  en,
  fr,
};

const t = new Traduire<TranslationSet>('fr', fr);

// this is a flat object Record<string, string> or null;
const params: TransDataToInject = {
  username: 'Haci',
};

// this line would tell you if key 'welcome' is incorrect
const text: string = t._('welcome', params);
```
