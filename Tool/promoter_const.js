const aaPromoter = {
    "aminoAcids": [
        { "name": "phenylalanine", "longCode": "Phe", "shortCode": "F", "codons": ["UUU", "UUC"] },
        { "name": "leucine", "longCode": "Leu", "shortCode": "L", "codons": ["UUA", "UUG", "CUU", "CUC", "CUA", "CUG"] },
        { "name": "isoleucine", "longCode": "Leu", "shortCode": "L", "codons": ["AUU", "AUC", "AUA"] },
        { "name": "methionine", "longCode": "Met", "shortCode": "M", "codons": ["AUG"] },
        { "name": "valine", "longCode": "Val", "shortCode": "V", "codons": ["GUU", "GUC", "GUA", "GUG"] },
        { "name": "serine", "longCode": "Ser", "shortCode": "S", "codons": ["UCU", "UCC", "UCA", "UCG", "AGU", "AGC"]},
        { "name": "proline", "longCode": "Pro", "shortCode": "P", "codons": ["CCU", "CCC", "CCA", "CCG"] },
        { "name": "threonine", "longCode": "Thr", "shortCode": "T", "codons": ["ACU", "ACC", "ACA", "ACG"] },
        { "name": "alanine", "longCode": "Ala", "shortCode": "A", "codons": ["GCU", "GCC", "GCA", "GCG"] },
        { "name": "tyrosine", "longCode": "Tyr", "shortCode": "Y", "codons": ["UAU", "UAC"] },
        { "name": "histidine", "longCode": "His", "shortCode": "H", "codons": ["CAU", "CAC"] },
        { "name": "glutamine", "longCode": "Gln", "shortCode": "Q", "codons": ["CAA", "CAG"] },
        { "name": "asparagine", "longCode": "Asn", "shortCode": "N", "codons": ["AAU", "AAC"] },
        { "name": "lysine", "longCode": "Lys", "shortCode": "K", "codons": ["AAA", "AAG"] },
        { "name": "aspartic acid", "longCode": "Asp", "shortCode": "D", "codons": ["GAU", "GAC"] },
        { "name": "glutamic acid", "longCode": "Glu", "shortCode": "E", "codons": ["GAA", "GAG"] },
        { "name": "cysteine", "longCode": "Cys", "shortCode": "C", "codons": ["UGU", "UGC"] },
        { "name": "tryptophan", "longCode": "Trp", "shortCode": "W", "codons": ["UGG"] },
        { "name": "arginine", "longCode": "Arg", "shortCode": "R", "codons": ["CGU", "CGC", "CGA", "CGG", "AGA", "AGG"] },
        { "name": "glycine", "longCode": "Gly", "shortCode": "G", "codons": ["GGU", "GGC", "GGA", "GGG"] },
        { "name": "stop codon", "longCode": "Stop", "shortCode": "Stop", "codons": ["UAA", "UAG", "UGA"] }
    ]
}

const rnaBase = ["A", "G", "C", "U"];


//ADD -35 and -10 box pssm ref values
const pssm = {
    "pssm": [
        {
            "position": "1", "boxType": "-35", "nt": [
                { "shortCode": "A", "value": "-0.73" },
                { "shortCode": "C", "value": "-1.25" },
                { "shortCode": "G", "value": "-1.79" },
                { "shortCode": "U", "value": "1.43" }]
        },
        {
            "position": "1", "boxType": "-10", "nt": [
                { "shortCode": "A", "value": "-1.94" },
                { "shortCode": "C", "value": "-1.70" },
                { "shortCode": "G", "value": "-2.20" },
                { "shortCode": "U", "value": "1.68" }
            ]
        },
        {
            "position": "2", "boxType": "-35", "nt": [
                { "shortCode": "A", "value": "-4.03" },
                { "shortCode": "C", "value": "-6.84" },
                { "shortCode": "G", "value": "-2.22" },
                { "shortCode": "U", "value": "1.89" }
            ]
        },
        {
            "position": "2", "boxType": "-10", "nt": [
                { "shortCode": "A", "value": "1.97" },
                { "shortCode": "C", "value": "-5.29" },
                { "shortCode": "G", "value": "-5.06" },
                { "shortCode": "U", "value": "-4.70" }
            ]
        },
        {
            "position": "3", "boxType": "-35", "nt": [
                { "shortCode": "A", "value": "-0.64" },
                { "shortCode": "C", "value": "-0.55" },
                { "shortCode": "G", "value": "1.12" },
                { "shortCode": "U", "value": "-0.99" }
            ]
        },
        {
            "position": "3", "boxType": "-10", "nt": [
                { "shortCode": "A", "value": "0.05" },
                { "shortCode": "C", "value": "-0.95" },
                { "shortCode": "G", "value": "-0.94" },
                { "shortCode": "U", "value": "0.95" }
            ]
        },
        {
            "position": "4", "boxType": "-35", "nt": [
                { "shortCode": "A", "value": "0.78" },
                { "shortCode": "C", "value": "0.14" },
                { "shortCode": "G", "value": "-0.98" },
                { "shortCode": "U", "value": "-0.57" }
            ]
        },
        {
            "position": "4", "boxType": "-10", "nt": [
                { "shortCode": "A", "value": "0.96" },
                { "shortCode": "C", "value": "-0.92" },
                { "shortCode": "G", "value": "-0.82" },
                { "shortCode": "U", "value": "-0.06" }
            ]
        },
        {
            "position": "5", "boxType": "-35", "nt": [
                { "shortCode": "A", "value": "0.18" },
                { "shortCode": "C", "value": "0.64" },
                { "shortCode": "G", "value": "-1.17" },
                { "shortCode": "U", "value": "-0.20" }
            ]
        },
        {
            "position": "5", "boxType": "-10", "nt": [
                { "shortCode": "A", "value": "1.03" },
                { "shortCode": "C", "value": "-0.26" },
                { "shortCode": "G", "value": "-0.98" },
                { "shortCode": "U", "value": "-0.70" }
            ]
        },
        {
            "position": "6", "boxType": "-35", "nt": [
                { "shortCode": "A", "value": "0.60" },
                { "shortCode": "C", "value": "-0.91" },
                { "shortCode": "G", "value": "-0.40" },
                { "shortCode": "U", "value": "0.25" }
            ]
        },
        {
            "position": "6", "boxType": "-10", "nt": [
                { "shortCode": "A", "value": "-1.66" },
                { "shortCode": "C", "value": "-2.59" },
                { "shortCode": "G", "value": "-3.06" },
                { "shortCode": "U", "value": "1.76" }
            ]
        }
    ]
}

const ERR_AA_IS_NOT_FOUND = "ERR_0";
const ERR_BOX_IS_EMPTY = "Please enter a value for -35 or -10 box";
const ERR_SYMBOL_NUMBER = "The number of symbols should be equal to 6 or 9";
const ERROR_FIELD = "errorMessage";
const ERROR = "Error: ";const CODON_SIZE_STR = "3";
const CODON_SIZE_NUM = 3;
const BOX_35 = "-35";
const BOX_10 = "-10";
const STOP_CODON = "stopCodon";

const BOX_35_TABLE = "35box_table";
const BOX_10_TABLE = "10box_table";
const PSSM_REF_TABLE = "pssm_ref_table";  
const AA_REF_TABLE = "aa_ref_table";  

const BOX_35_INPUT_BOX = "-35box";
const BOX_10_INPUT_BOX = "-10box";
const BOX_35_TABLE_CAPTION = "-35 box promoters";
const BOX_10_TABLE_CAPTION = "-10 box promoters";
const AA_REF_TABLE_CAPTION = "Amino acids reference table"
const PSSM_REF_TABLE_CAPTION = "PSSM reference table (E.coli)"
