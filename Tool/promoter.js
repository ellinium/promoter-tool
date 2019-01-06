

    function calculatePromoter() {

        try {
            clearErrors();
            var box35Value = document.getElementById(BOX_35_INPUT_BOX).value.toUpperCase();
            var box10Value = document.getElementById(BOX_10_INPUT_BOX).value.toUpperCase();

            if (box35Value == "" && box10Value == "") {
                throw ERR_BOX_IS_EMPTY;
            }

            //TODO
            if (box35Value.length != 6 || box10Value.length != 6) {
                throw ERR_SYMBOL_NUMBER;
            }

            if (box35Value != "") {
                //DNA to RNA
                box35Value = box35Value.replace(/T/gi, "U");
                //check codon number
                checkCodonNumber(box35Value, "-35");
                //extract all boxes codons
                var codons_35 = extractCodons(box35Value, "-35");
                codons_35 = codons_35.map(findAminoAcidbyCodon);
                //add input values to the final promoter arrays
                var allPromoters35Box = [];
                //join codons and aa for both boxes
                allPromoters35Box.push(joinDefaultCodonValues(codons_35, BOX_35));
                var allPromoters35Codons = [];
                var allPromoters10Codons = [];
                allPromoters35Codons.push({ codonValue: codons_35[0].boxCodonValue, codonNumber: 1, boxType: BOX_35 });
                allPromoters35Codons.push({ codonValue: codons_35[1].boxCodonValue, codonNumber: 2, boxType: BOX_35 });

                //combine codons - 2 codons
                var allPromoters35CodonsPerm = findAllPromoterPermutations(allPromoters35Codons, BOX_35);
                var allPromoters35CodonsAAInfo = allPromoters35CodonsPerm.map(findAminoAcid4Promoter);

                var allPromoters35CodonsFullInfo = allPromoters35CodonsAAInfo.map(calculateTotalPSSM);
                addAAInfotoTableArr("35box_table", allPromoters35CodonsFullInfo);
            }

            if (box10Value != "") {
                //DNA to RNA
                box10Value = box10Value.replace(/T/gi, "U");

                //check codon number
                checkCodonNumber(box10Value, "-10");

                //extract all boxes codons
                var codons_10 = extractCodons(box10Value, "-10");
                codons_10 = codons_10.map(findAminoAcidbyCodon);

                //add input values to the final promoter arrays
                var allPromoters10Box = [];

                //join codons and aa for both boxes
                allPromoters10Box.push(joinDefaultCodonValues(codons_10, BOX_10));

                //add 2 default codons
                //codons_35.map(c => {allPromoters35Perm.unshift({codonValue: c.boxCodonValue, codonNumber: 1})});
                var allPromoters10Codons = [];
                allPromoters10Codons.push({ codonValue: codons_10[0].boxCodonValue, codonNumber: 1, boxType: BOX_10 });
                allPromoters10Codons.push({ codonValue: codons_10[1].boxCodonValue, codonNumber: 2, boxType: BOX_10 });


                //combine codons - 2 codons
                var allPromoters10CodonsPerm = findAllPromoterPermutations(allPromoters10Codons, BOX_10);
                //var allPromoters10CodonsPerm = findAllPromoterPermutations(allPromoters10Codons);

                var allPromoters10CodonsAAInfo = allPromoters10CodonsPerm.map(findAminoAcid4Promoter);
                var allPromoters10CodonsFullInfo = allPromoters10CodonsAAInfo.map(calculateTotalPSSM);

                addAAInfotoTableArr("10box_table", allPromoters10CodonsFullInfo);
            }
        }
        catch (e) {
            console.log(e);
            var errorField = document.getElementById(ERROR_FIELD);
            errorField.style.color = "red";
            errorField.style.backgroundColor = "rgb(190, 225, 253)";
            errorField.innerHTML = ERROR + e;
        }

    }

    function clearErrors() {
        var errorField = document.getElementById(ERROR_FIELD);
        errorField.innerHTML = "";
    }


    function findAllCodons() {
        var allCodons = [];
        for (let i in aaPromoter.aminoAcids) {
            allCodons = allCodons.concat(aaPromoter.aminoAcids[i].codons);
        }

        return allCodons;
    }

    // function findAllPromoterCodons(boxValue, boxType) {
    //     var tmpCodon = "";
    //     var arrCodons = [];
    //     var codonNumber = 0;

    //     //split into codons
    //     for (let i = 0; i < boxValue.length; i = i + CODON_SIZE_NUM) {
    //         codonNumber += 1;
    //         tmpCodon = boxValue.substr(i, CODON_SIZE_NUM);

    //         for (let x = 0; x < tmpCodon.length; x++) {
    //             for (let y in rnaBase) {
    //                 tmp1 = tmpCodon;
    //                 tmp1[x] = rnaBase[y];
    //             }

    //         }

    //         //var codonSymbLeftNum = tmpCodon.length;
    //         var tmpCodonRep = tmpCodon;
    //         var codonSymbLeft = "";
    //         for (let x = 0; x < tmpCodon.length; x++) {
    //             for (let z = 0; z < tmpCodonRep.length; z++) {
    //                 for (let y in rnaBase) {
    //                     if (tmpCodonRep[x] != rnaBase[y]) {
    //                         var tmp1 = tmpCodonRep;
    //                         var tmpArr = tmp1.split("");
    //                         tmpArr[x] = rnaBase[y];
    //                         //tmp1 = rnaBase[y];
    //                         //tmp1 += tmpCodon.substr(tmp1.length, 3 - tmp1.length);
    //                         arrCodons.push({ codonValue: tmpArr.join(""), codonNumber: codonNumber, boxType: boxType });


    //                     }
    //                 }
    //                 tmpCodonRep = tmpCodon.substr(z + 1, tmpCodon.length - 1);
    //             }
    //         }
    //     }

    //     return arrCodons;
    // }

    function findAllPromoterPermutations(arrCodons, boxType) {
        var allCodons = findAllCodons();


        //TBD remove STOP codon
        var firstCodon = arrCodons[0].codonValue;
        var secondCodon = arrCodons[1].codonValue;
        var allPermutations = [];
        var tmpPromoterArrFirst = [];
        var tmpPromoterArrSecond = [];

        for (let c in allCodons) {
            var tmpPromoterFirst = "";
            var tmpPromoterSecond = "";
            tmpPromoterFirst = firstCodon + allCodons[c].toString();
            
            tmpDNAPromoterFirst = tmpPromoterFirst.replace(/U/gi, "T");

            tmpPromoterSecond = allCodons[c].toString() + secondCodon;

            tmpDNAPromoterSecond = tmpPromoterSecond.replace(/U/gi, "T");

            tmpPromoterArrFirst.push({ promoter: tmpPromoterFirst, DNAPromoter:tmpDNAPromoterFirst, boxType });
            tmpPromoterArrSecond.push({ promoter: tmpPromoterSecond, DNAPromoter:tmpDNAPromoterSecond, boxType });
        }


        return tmpPromoterArrFirst.concat(tmpPromoterArrSecond);
    }

    // function findAllPromoterPermutations1(arrCodons) {
    //     var codonFiltered1 = arrCodons.filter(c => c.codonNumber == 1);
    //     var codonFiltered2 = arrCodons.filter(c => c.codonNumber == 2);
    //     let boxType = arrCodons[0].boxType;

    //     //default 1st codon + all 2nd codon options
    //     var codon_1_2 = [];
    //     for (let cd in codonFiltered2) {
    //         let tmpNTArray = [];
    //         let tmpPromoter = "";
    //         tmpPromoter = arrCodons[0].codonValue + codonFiltered2[cd].codonValue;
    //         codon_1_2.push({ promoter: tmpPromoter, boxType: boxType });
    //     }

    //     //all 1st codons options + default 2nd codon
    //     for (let cd in codonFiltered1) {
    //         let tmpNTArray = [];
    //         let tmpPromoter = "";
    //         tmpPromoter = codonFiltered1[cd].codonValue + arrCodons[1].codonValue;
    //         codon_1_2.push({ promoter: tmpPromoter, boxType: boxType });
    //     }

    //     //combine all 1st and all 2nd codons
    //     for (let cd1 in codonFiltered1) {
    //         let tmpNTArray = [];
    //         let tmpPromoter = "";
    //         for (let cd2 in codonFiltered2) {
    //             tmpPromoter = codonFiltered1[cd1].codonValue + codonFiltered2[cd2].codonValue;
    //             codon_1_2.push({ promoter: tmpPromoter, boxType: boxType });
    //         }
    //     }

    //     return codon_1_2;
    // }

    function joinDefaultCodonValues(cd, boxType) {
        var aaSeqName = "";
        var aaSeqLong = "";
        var aaSeqShort = "";
        var promoter = "";

        for (let c in cd) {
            var codon = cd[c];

            //form aa result string
            if (c == 0) { // first element
                aaSeqName = codon.aaName;
                aaSeqLong = codon.aaLongCode;
                aaSeqShort = codon.aaShortCode;
                promoter = cd[c].codon;
            }
            else { //join values for the output using "-"
                aaSeqName = aaSeqName + "-" + codon.aaName;
                aaSeqLong = aaSeqLong + "-" + codon.aaLongCode;
                aaSeqShort = aaSeqShort + "-" + codon.aaShortCode;
                promoter += cd[c].codon;
            }
        }

        var res = {};
        if (cd[0].boxDefaultValue != undefined) {
            res = { promoter: cd[0].boxDefaultValue, aaName: aaSeqName, aaSeqLong: aaSeqLong, aaSeqShort: aaSeqShort };
        }
        else {
            res = { boxType: boxType, promoter: promoter, DNAPromoter: promoter.replace(/U/gi, "T"),  codon1: cd[0].codon, codon2: cd[1].codon, aaName: aaSeqName, aaSeqLong: aaSeqLong, aaSeqShort: aaSeqShort };

        }

        return res;
    }

    function checkCodonNumber(boxValue, boxType) {
        if (boxValue.length % 3 != 0) {
            console.error("The " + boxType + " box value is not multiple of three");
        }
    }

    function extractCodons(boxValue, boxType) {
        var cd = [];
        for (i = 0; i < boxValue.length; i = i + CODON_SIZE_NUM) {
            cd.push({ boxDefaultValue: boxValue, boxCodonValue: boxValue.substr(i, 3), boxType: boxType });
        }
        return cd;
    }

    function findAminoAcidbyCodon(codon) {
        var aa = findCodon(aaPromoter.aminoAcids, codon.boxCodonValue.toUpperCase());
        //TBD error handling
        if (aa === undefined) {
            throw ("Amino acid cannot be found, invalid codon " + codon.boxCodonValue);
        }
        else {
            codon.aaName = aa.name;
            codon.aaLongCode = aa.longCode;
            codon.aaShortCode = aa.shortCode;
            return codon;
        }
    }

    function findAminoAcid4Promoter(promoterObj) {

        let codonArr = promoterObj.promoter.match(new RegExp(".{" + CODON_SIZE_NUM + "}", "g"));
        let codonMap = [];
        let boxType = promoterObj.boxType;

        for (let c = 0; c < codonArr.length; c++) {
            codonMap.push({ codon: codonArr[c], position: c + 1, boxType: boxType });
        }

        //console.log(codonMap.codon);
        codonMap.map(findAAbyCodon);
        let res = joinDefaultCodonValues(codonMap, boxType);

        promoterObj = res;
        return promoterObj;
    }

    function findCodon(arr, codon) {
        return arr.find(function (elem) {
            return elem.codons.includes(codon)
        })
    }

    function findAAbyCodon(codonObj) {
        let aa = aaPromoter.aminoAcids.find(function (elem) {
            return elem.codons.includes(codonObj.codon)
        });

        //TBD error handling
        let res = {};
        if (aa === undefined) {
            console.error("Amino acid cannot be found, invalid codon " + promoterObj.codon);
            return ERR_AA_IS_NOT_FOUND;
        }
        else {
            codonObj.aaName = aa.name;
            codonObj.aaLongCode = aa.longCode;
            codonObj.aaShortCode = aa.shortCode;
            return codonObj;
        }
    }
    // function convertCodonToNTArray(elem) {
    //     let ntPos = {};
    //     ntPos = { position: codonNumber * 3 + x + 1, boxType: boxType, nc_code: codonStr[x] };
    //     console.log("INTERMEDIATE nt_pos2 ");
    //     console.log(ntPos);
    // }

    function convertCodonToNTArray(codonStr, boxType, codonNumber) {
        var ntPos = [];
        for (let x = 0; x < codonStr.length; x++) {
            ntPos.push({ position: codonNumber * 3 + x + 1, boxType: boxType, nc_code: codonStr[x] });
        }
        return ntPos;
    }

    function clearForm() {

        clearErrors();

        //clear input forms
        document.getElementById(BOX_35_INPUT_BOX).value = "";
        document.getElementById(BOX_10_INPUT_BOX).value = "";

        //clear tables
        clearDataTables(BOX_35_TABLE);
        clearDataTables(BOX_10_TABLE);

    }

    function calculateTotalPSSM(arr) {
        var pssmSum = 0;

        //arr.ntArr1 = arr.codon1.split("");
        //arr.ntArr2 = arr.codon2.split("");
        arr.ntArr1Pos = convertCodonToNTArray(arr.codon1, arr.boxType, 0);
        arr.ntArr2Pos = convertCodonToNTArray(arr.codon2, arr.boxType, 1);

        pssmSum = findCodonPSSM(arr.ntArr1Pos) + findCodonPSSM(arr.ntArr2Pos);
        arr.pssm = pssmSum.toFixed(2);
        return arr
    }


    function findCodonPSSM(arr) {
        var pssmSum = 0;
        for (let nt in arr) {
            var pssmRef = pssm.pssm;
            var pssmPos = pssmRef.find(function (elem) {
                return (elem.position == arr[nt].position) && (elem.boxType == arr[nt].boxType)
            });

            var pssmVal = pssmPos.nt.find(function (elem) {
                return elem.shortCode == arr[nt].nc_code;
            });

            pssmSum += Number(pssmVal.value);
        }
        return Number(pssmSum);
    }

    function addAAInfotoTableArr(tableName, arr) {

        clearDataTables(tableName);

        var tableInfo = document.getElementById(tableName);
        //add captions
        var tblCaption = tableInfo.createCaption();
        if(tableName == BOX_35_TABLE) {
            
            tblCaption.innerHTML = BOX_35_TABLE_CAPTION;
        }
        else if(tableName == BOX_10_TABLE) {
            tblCaption.innerHTML = BOX_10_TABLE_CAPTION;
         }  

        $(document).ready(function () {
            $("#" + tableName).DataTable({
                //  $(tblObj).DataTable({
                data: arr,
                order: [5, "asc"],
                columns: [
                    { title: "Promoter", data: "DNAPromoter" },
                    //{ data: "promoter" },
                    { title: "Box Type", data: "boxType" },
                    { title: "Amino acid sequence (full)", data: "aaName" },
                    { title: "Amino acid sequence (long code)", data: "aaSeqLong" },
                    { title: "Amino acid sequence (short code)", data: "aaSeqShort" },
                    { title: "PSSM score", data: "pssm" }
                ],
            });
        });


    }

    function clearDataTables(tableName) {

        var bTableExists = $.fn.DataTable.isDataTable("#" + tableName);

        if (bTableExists) {
            var dataTable = $("#" + tableName).DataTable();
            dataTable.clear().draw();
            dataTable.destroy();

        }
    }

