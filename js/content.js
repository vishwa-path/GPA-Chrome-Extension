function DOMtoString(document_root) {
    function count(main_str, sub_str) 
    {
        main_str += '';
        sub_str += '';

        if (sub_str.length <= 0) 
            return main_str.length + 1;

        subStr = sub_str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        return (main_str.match(new RegExp(subStr, 'gi')) || []).length;
    }
    function getPosition(string, subString, index) 
    {
        return string.split(subString, index).join(subString).length;
    }
    var html = '',
        node = document_root.firstChild;
    while (node) {
        switch (node.nodeType) {
        case Node.ELEMENT_NODE:
            html += node.outerHTML;
            break;
        }
        node = node.nextSibling;
    }
    var index1 = html.indexOf('<table class="table table-bordered table-condensed table-striped" id="student_subject">');
    if(index1==-1)
        return 'Please open your ACOE Attendance & Marksheet!';
    var index2 = html.indexOf('</table>');
    while(index1>index2)
        var index2 = html.indexOf('</table>'.index+1);
    var final=html.slice(index1,index2+8);
    var headings,subjects,sub,grade,total_credits=0,total_score=0;
    var no_of_credits = { 'HS5151' : 4 ,'HS7151':4, 'HS7251':4, 
        'HS5251' : 4,'CE5361':2, 'HS7561':2,'CE7512':2,
        'CE5311':2,'CE5312':2,'BS7161':2, 'CE7362':2,'CE7511':2,
        'CE5461':2,'CE5411':2,'CE5312':2,'CE7261':2,'CE7311':2, 
        'CE5511':2,'CE5512':2,'GE7152' : 4,'CE7353':4,'CE7411':2,
        'CE7603':4,'CE7612':2,'CE7712':2,'CE7611':2, 'CE7613':2,
        'CE7711':2, 'CE7713':2,'CE7811':10,
        'CE5611':2,'CE5612':2,'CE5712':2,'MA7302':4,'MA7354':4,
        'CE5613':1,'CE5711':2,'CE5811':8,'MA7358':4,'MA7353':4,
        'MA5158' : 4, 'MA5356' : 4,'MA7151':4, 'MA7251':4, 'MA7451':4,
        'MA7359':4, 'MA7355':4,'GE7161' : 2,'GE7162' : 2,'EC7261':2,
        'MA5252' : 4, 'GE5152' : 4,'EC7211':2,'EC7511':2,'EC7512':1,
        'EC7352':4,'EC7311':2,'EC7411':2,'EC7412':2,'EC7713':2,
        'BS5161' : 2, 'EC5251' : 4, 'EC7712':2,'EC7711':2,'EC7561':2,
        'GE5161' : 2, 'EE5313' : 2, 'EC7611':2,'EC7612':2,'EC7613':1,
        'IT5211' : 2, 'GE5162' : 2,'EC7811':10,
        'BM7311':2,'BM7312':2,'BM7411':2,'BM7412':2,'BM7511':2,
        'BM7611':2,'BM7612':2,'BM7711':2,'BM7712':2,'BM7713':1, 
        'ME5361':2,'ME5401':4,'BM7811':10,'ME7761':2,'ME7611':2,  
        'ME5461':2, 'ME5411':2,'ME7552':4,'ME7501':2,'ME7511':2, 
        'ME5511':2,'ME5512':2,'ME7411':2,'ME7361':2,'ME7601':4, 'ME7602':4,
        'ME5611':2,'ME5612':2,'ME7301':4,'ME7712':2,'ME7711':2,'ME7811':10,  
        'ME5761':2, 'ME7561':2,'ME7261':2,  
        'ME5513' :2,'IE5811':8,
        'IT5311' : 2, 'EC5211' : 2,
        'IT5312' : 2, 'EC5301' : 4,
        'IT5411' : 2,'EC5304' : 4,
        'IT5412' : 2,'EC5311' : 2,
        'EC5312' : 2,'BM5311' :2,
        'BM5411' :2, 'BM5511' :2, 
        'BM5512' :2, 'BM5611' :2, 
        'IT5511' : 2,'EC5403' :4,
        'IT5512' : 2,'EC5411' :2,
        'IT5611' : 2,'EC5412' :2,
        'EC5413' : 2 ,'BM5712':2,
        'BM5513':2,'BM5711':2,
        'BM5811':8, 'EE5211' : 2,
        'IT5612' : 2,'EC5511' :2, 
        'IT5513' : 2,'EC5561 ':2,
        'IT5613' : 1,'EC5611':2, 
        'IT5811' : 8, 'EC5711':2,
        'EE5261' : 2,'EC5612':2,
        'MA5002' : 4,'EC5512':2,
        'MA5356' : 4,'EC5811':8,
        'MA5302' : 4,'MA5355':4, 'MA7357':4,'MA7451':4, 
        'AD5091' : 0,'EE5304':4,
        'AD5092' : 0, 'EE5311':2, 'EE5312':2,'EE7301':4,'EC7312':2,
        'AD5093' : 0, 'EE5411':2, 'EE5412':2,'EE7302':4,'EE7211':2,'EE7261':2,
        'AD5094' : 0, 'EE5511':2, 'EE5512':2,'EE7303':4,'EE7401':4,'EE7811':10, 
        'AD5095' : 0, 'EE5611':2, 'EE5612':2,'EE7402':4,'EE7411':2,'EE7412':2,
        'AD5096' : 0, 'EE5711':2, 'EE5712':2,'EE7511':2,'EE7512':2,'EE7504':4, 
        'AD5097' : 0, 'EE5811':8,'EE7602':4, 'EE7611':2,'EE7612':2,'EE7613':1,'EE7711':2,'EE7712':1,
        'AD5098' : 0,'CS7511':2, 'CS7512':2,'CS7711':2,'CS7712':2,'CS7713':1,
        'CS7611':2, 'CS7612':2,'CS7701':4,'CS7811':10, 
        'CS7311':4,'CS7211':2,'CS7312':2,'CS7451':4,
        'CS7411':2, 'CS7412':2,'CS7502':4,
        'IT7211':2, 'IT7311':2,'IT7312':2,'IT7811':10, 
        'IT7411':2,'IT7412':2,'IT7611':2,'IT7612':2,'IT7613':2,
        'IT7511':2,'IT7512':2,'IT7513':1,'IT7711':2,'IT7712':2,
    };
    var grade_to_gpa={
        '>O':10,'A+':9,'>A':8,'B+':7,'>B':6,'RA':0
    };
    var flag=0,gpa;
    headings=count(final,'</th>');
    subjects=count(final,'</tr>')-1;
    index1=getPosition(final, '<tr>', 2);
    index2=getPosition(final, '</tr>',subjects+1);
    final=final.slice(index1,index2+5);
    while(flag!=subjects)
    {
        index1=getPosition(final,'</td>',2);
        sub=final.slice(index1-6,index1);
        index2=getPosition(final,'</td>',headings);
        grade=final.slice(index2-2,index2);
        if(grade in grade_to_gpa)
        {
            if(sub in no_of_credits)
                total_score+=no_of_credits[sub]*grade_to_gpa[grade];
            else
                total_score+=3*grade_to_gpa[grade];
            if(grade_to_gpa[grade]!=0)
                if(sub in no_of_credits)
                    total_credits+=no_of_credits[sub];
                else
                    total_credits+=3;
        }
        index1=getPosition(final, '<tr>', 2);
        final=final.slice(index1);
        flag+=1;
    }
    var final_gpa_temp=total_score/total_credits;
    final_gpa_temp=final_gpa_temp.toFixed(2);
    var final_gpa=""+final_gpa_temp;
    if(final_gpa=='NaN')
        final_gpa='No Scores yet!';
    else
        final_gpa="Your GPA for this semester is "+final_gpa+" !";
    return final_gpa;
}

chrome.runtime.sendMessage({
    action: "getSource",
    source: DOMtoString(document)
});