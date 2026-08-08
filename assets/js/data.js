const NUMERO_WA = '5511994873719';

const CATEGORIAS = [
  { slug: 'todos',               label: 'Todos' },
  { slug: 'eletrica',            label: 'Elétrica' },
  { slug: 'hidraulica',          label: 'Hidráulica' },
  { slug: 'pintura',             label: 'Pintura' },
  { slug: 'ferramentas',         label: 'Ferramentas' },
  { slug: 'utilitarios',         label: 'Utilitários' },
  { slug: 'reforma-construcao',  label: 'Reforma e Construção' },
];


const produtos = [
  {
    id: 1,
    nome: 'Escada Caracol',
    categoria: 'Pré-moldada',
    preco: 499.99,
    imagem: 'assets/img/produtos/caracol.jfif',
    disponivel: true,
    destaque: true,
    novo: true,
  },
  {
    id: 2,
    nome: 'Escada Cascata',
    categoria: 'Pré-moldada',
    preco: 299.99,
    imagem: 'assets/img/produtos/escada-cascata.jpg',
    disponivel: true,
    destaque: true,
    novo: true,
  },
];