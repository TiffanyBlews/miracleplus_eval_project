import { financialPoster } from './financialPoster';
import { palindromeSearch } from './palindromeSearch';
import { pdfParsing } from './pdfParsing';
import { stringTasks } from './stringTasks';

const datasets = [financialPoster, palindromeSearch, pdfParsing, ...stringTasks.map(task => task.task).filter(Boolean)];
export default datasets; 