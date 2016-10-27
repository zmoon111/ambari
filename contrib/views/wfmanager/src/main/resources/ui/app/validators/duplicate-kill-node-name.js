/*
*    Licensed to the Apache Software Foundation (ASF) under one or more
*    contributor license agreements.  See the NOTICE file distributed with
*    this work for additional information regarding copyright ownership.
*    The ASF licenses this file to You under the Apache License, Version 2.0
*    (the "License"); you may not use this file except in compliance with
*    the License.  You may obtain a copy of the License at
*
*        http://www.apache.org/licenses/LICENSE-2.0
*
*    Unless required by applicable law or agreed to in writing, software
*    distributed under the License is distributed on an "AS IS" BASIS,
*    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
*    See the License for the specific language governing permissions and
*    limitations under the License.
*/
import BaseValidator from 'ember-cp-validations/validators/base';

const DuplicateKillNodeName = BaseValidator.extend({
  validate(value, options, model, attribute) {
    let killNodes = [], flag;
    model.get("validationErrors").clear();
    if(model.get("workflow") && model.get("workflow").killNodes){
      killNodes = model.get("workflow").killNodes;
      for(let i=0; i<killNodes.length; i++){
        for(let j=0; j<killNodes.length; j++){
          if(killNodes[i].name === killNodes[j].name && i !== j){
            model.get('validationErrors').pushObject({node : killNodes[j] ,message : "Duplicate killnode"});
            flag = true;
            break;
          }
        }
        if(flag){
          break;
        }
      }
    }
    if (flag){
      return false;
    }
    return true;
  }
});

DuplicateKillNodeName.reopenClass({
  /**
   * Define attribute specific dependent keys for your validator
   *
   * @param {String}  attribute   The attribute being evaluated
   * @param {Unknown} options     Options passed into your validator
   * @return {Array}
   */
  getDependentsFor(/* attribute, options */) {
    return [];
  }
});

export default DuplicateKillNodeName;
